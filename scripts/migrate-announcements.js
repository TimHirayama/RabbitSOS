const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
// const fetch = require("node-fetch"); // Native fetch in Node 20+
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Must be Service Role Key for Admin access

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const BASE_URL = "https://rabbitsos.org";
const ANNOUNCEMENT_URL = `${BASE_URL}/anouncement.php`;

// Map Chinese categories to DB enums
const CATEGORY_MAP = {
  置頂: "top",
  公益募款: "fundraising",
  活動: "event",
  最新公告: "news",
  衛教知識: "knowledge",
  拾獲棄兔: "found",
};

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Download file and return buffer + mime type
async function downloadFile(url) {
  // Force HTTPS for rabbitsos
  if (url.startsWith("http://") && url.includes("rabbitsos.org")) {
    url = url.replace("http://", "https://");
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const contentType = res.headers.get("content-type");
    return { buffer, contentType };
  } catch (error) {
    console.error(`Error downloading ${url}:`, error.message);
    return null;
  }
}

// Upload file to Supabase Storage
async function uploadToStorage(buffer, filename, contentType) {
  // Sanitize filename
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `migration/${Date.now()}_${sanitizedFilename}`;

  const { data, error } = await supabase.storage
    .from("documents") // Using 'documents' bucket for all migration files
    .upload(path, buffer, {
      contentType: contentType,
      upsert: true,
    });

  if (error) {
    console.error("Storage upload error:", error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from("documents")
    .getPublicUrl(path);

  return publicUrlData.publicUrl;
}

async function scrapeDetails(link) {
  try {
    const res = await fetch(link);
    const html = await res.text();
    const $ = cheerio.load(html);

    // This selector depends on the actual site structure.
    // Based on inspection, content is usually in a specific div.
    // We might need to adjust this selector.
    // Strategy: Look for the main content container.
    // Common pattern in PHP sites: a main td or div.
    // Let's try to grab the content more generically if specific selector fails.
    
    // Attempt to find the main content. This is heuristic based on standard layouts.
    // We'll target the area that contains the text.
    // Usually inner pages have a structure.
    
    // For now, let's look for images and file links within the whole body or a main container if identified.
    // Let's assume the content is within `td` or `div` that doesn't have menu classes.
    
    // IMPORTANT: Since I can't browse interactively, I'll rely on common patterns.
    // We will process all `img` tags inside the main content area.
    
    // Let's grab the title and date again from the detail page if possible, or pass it in.
    
    // Find content wrapper (simplification)
    // We'll treat the whole page body (excluding navs) as potential content.
    // But to be safer, we extract specific content.
    
    // Let's try to identify the unique content part.
    // For now, let's grab the HTML of the main `td` that holds the article using a loose selector.
    // Often it's something like `td[valign="top"]` or checking for the title text.
    
    // ... For this script, I will try to find the container that holds the title.
    
    // Fallback: Return raw body content filtered by some selectors.
    // Remove scripts, styles, navs.
    $("script").remove();
    $("style").remove();
    $("nav").remove();
    $("header").remove();
    $("footer").remove();
    $(".nav").remove();
    $(".menu").remove();
    $(".aboutMenu").remove();
    $(".visual-background").remove();
    $("#fb-root").remove();
    $("noscript").remove();
    $(".modal").remove(); // Remove login/msg modals
    
    // Find images
    const images = [];
    $("img").each((i, el) => {
      const src = $(el).attr("src");
      if (src && !src.startsWith("http") && !src.includes("logo")) { // Exclude logo if still present
         const fullUrl = new URL(src, BASE_URL).href;
         images.push({ el, src: fullUrl });
      }
    });

    for (const img of images) {
      console.log(`  Downloading image: ${img.src}`);
      const fileData = await downloadFile(img.src);
      if (fileData) {
        const filename = path.basename(img.src);
        const publicUrl = await uploadToStorage(fileData.buffer, filename, fileData.contentType);
        if (publicUrl) {
          $(img.el).attr("src", publicUrl);
          // Remove fixed dimensions to make it responsive
          $(img.el).removeAttr("width");
          $(img.el).removeAttr("height");
          $(img.el).removeAttr("style"); // Remove inline styles
        }
      }
    }

    // Find PDF/File links
    const files = [];
    const EXCLUDE_KEYWORDS = ["授權書", "通知單", "信用卡", "捐款單", "捐款通知"];
    
    $("a").each((i, el) => {
      const href = $(el).attr("href");
      if (href && (href.endsWith(".pdf") || href.endsWith(".doc") || href.endsWith(".docx"))) {
         const fullUrl = new URL(href, BASE_URL).href;
         // Decode to check for chinese keywords
         try {
           const decoded = decodeURIComponent(fullUrl);
           if (!EXCLUDE_KEYWORDS.some(k => decoded.includes(k))) {
             files.push({ el, src: fullUrl });
           }
         } catch (e) {
           files.push({ el, src: fullUrl });
         }
      }
    });

    let fileUrl = null; // Store one main file URL for the 'file_url' column if exists

    for (const file of files) {
      console.log(`  Downloading file: ${file.src}`);
      const fileData = await downloadFile(file.src);
      if (fileData) {
        const filename = path.basename(file.src);
        const publicUrl = await uploadToStorage(fileData.buffer, filename, fileData.contentType);
        if (publicUrl) {
          $(file.el).attr("href", publicUrl);
          if (!fileUrl) fileUrl = publicUrl; // Use first file as main attachment
        }
      }
    }
    
    // Try to find the title in text to locate content start?
    
    // Let's assume there is a table structure. 
    // We will extract innerHTML of `body` for now, but stripped of common junk.
    // Users might need to clean up post-migration.
    
    // Actually, looking at the previous chunks, the list format was:
    // 2023-07-17 [tab] 置頂 [tab] 物資需求表
    
    // Let's refine the script to accept the html string and return it.
    // Important: We need a cover image. We'll use the first image found as cover.
    let coverImage = null;
    if (images.length > 0) {
       coverImage = $(images[0].el).attr("src");
    }

    return {
      content: $("body").html(), // Very rough, might include sidebar. Better than nothing.
      fileUrl: fileUrl,
      coverImage: coverImage
    };

  } catch (error) {
    console.error(`Error scraping details ${link}:`, error);
    return { content: "", fileUrl: null, coverImage: null };
  }
}

async function main() {
  console.log("Starting migration...");
  
  // 1. Fetch List
  const response = await fetch(ANNOUNCEMENT_URL);
  const text = await response.text();
  
  fs.writeFileSync("debug.html", text);
  console.log("Saved HTML to debug.html");

  const $ = cheerio.load(text);
  
  // Parse the list based on the identified structure
  // <li class="announceWording">
  //   <span class="text-secondary">2023-07-17...</span>
  //   <span class="text-danger">Category</span>
  //   Title
  // </li>
  
  const items = $("li.announceWording");
  console.log(`Found ${items.length} items.`);

  const posts = [];

  items.each((i, el) => {
    const li = $(el);
    const linkEl = li.parent("a"); // The <a> wraps the <li>
    const href = linkEl.attr("href");
    
    // Extract Date
    const dateText = li.find(".text-secondary").text().trim();
    const dateMatch = dateText.match(/(\d{4}-\d{2}-\d{2})/);
    const date = dateMatch ? dateMatch[1] : null;
    
    // Extract Category
    const categoryText = li.find(".text-danger").text().trim();
    let category = "news";
    if (CATEGORY_MAP[categoryText]) {
      category = CATEGORY_MAP[categoryText];
    }
    
    // Extract Title (Get text of li, remove children text)
    // Clone to safely remove children without affecting original (though Cheerio objects are efficient)
    const liClone = li.clone();
    liClone.find("span").remove();
    liClone.find("div").remove();
    const title = liClone.text().trim();

    if (href && title && date) {
      // Construct full URL
      const fullLink = new URL(href, BASE_URL).href;
      
      posts.push({
        title,
        published_at: date,
        category,
        original_link: fullLink
      });
    }
  });

  console.log(`Identified ${posts.length} posts to migrate.`);

  // Cleanup old migration data
  console.log("Cleaning up previous migration data (posts with migration files)...");
  // Delete posts where file_url OR cover_image contains '/migration/'
  // Since Supabase JS delete filters are AND by default, we do two calls to be safe/simple.
  await supabase.from("posts").delete().like("file_url", "%/migration/%");
  await supabase.from("posts").delete().like("cover_image", "%/migration/%");
  
  // 2. Process each post
  for (const post of posts) {
    console.log(`Processing: [${post.published_at}] ${post.title}`);
    
    // Don't hammer the server
    await sleep(100 // small delay
    );
    
    const details = await scrapeDetails(post.original_link);
    
    // Prepare DB Record
    const dbRecord = {
      title: post.title,
      category: post.category,
      content: details.content, // This will be raw HTML with updated image links
      published_at: new Date(post.published_at).toISOString(),
      published: true,
      cover_image: details.coverImage || null,
      file_url: details.fileUrl || null,
      created_at: new Date().toISOString(),
      // updated_at: new Date().toISOString(), // Column might be missing or auto-managed
    };

    // 3. Insert into Supabase
    const { error } = await supabase
      .from("posts")
      .insert(dbRecord);

    if (error) {
      console.error(`Error inserting post "${post.title}":`, error.message);
    } else {
      console.log(`Successfully migrated "${post.title}"`);
    }
  }

  console.log("Migration complete!");
}

main().catch(console.error);
