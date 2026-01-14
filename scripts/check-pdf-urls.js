const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing env vars");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  console.log("Checking uploaded files...");

  const { data: posts, error } = await supabase
    .from("posts")
    .select("title, file_url")
    .not("file_url", "is", null)
    .limit(10);

  if (error) {
    console.error("Error fetching posts:", error);
    return;
  }

  for (const post of posts) {
    console.log(`\nChecking: ${post.title}`);
    console.log(`URL: ${post.file_url}`);

    try {
      const res = await fetch(post.file_url, { method: "HEAD" });
      const type = res.headers.get("content-type");
      const len = res.headers.get("content-length");
      
      console.log(`Status: ${res.status}`);
      console.log(`Type: ${type}`);
      console.log(`Size: ${len} bytes`);
      
      if (type.includes("html")) {
        console.warn("⚠️  WARNING: File seems to be HTML, not PDF!");
      }
    } catch (e) {
      console.error("Fetch error:", e.message);
    }
  }
}

main();
