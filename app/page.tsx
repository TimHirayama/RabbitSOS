import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-orange-50 py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585110396067-c1d6389710cc?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 group-hover:text-primary transition-colors">
              給流浪兔一個<span className="text-primary">溫暖的家</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-noto-sans-tc">
              我們致力於救援、醫療與安置流浪兔。
              每一隻兔子都值得被溫柔對待，您的支持是我們持續前行的動力。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 text-lg" asChild>
                <Link href="/rabbits">我是認養人</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-lg bg-white/80 hover:bg-white" asChild>
                <Link href="/donate/report">我要捐款</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats / Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">救援照護</h3>
              <p className="text-muted-foreground">提供專業醫療與中途家庭照護，確保每一隻兔子恢復健康。</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">認養媒合</h3>
              <p className="text-muted-foreground">嚴格審核認養人資格，為兔子尋找最適合的終身歸宿。</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-stone-50">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">教育推廣</h3>
              <p className="text-muted-foreground">舉辦講座與活動，推廣正確的養兔知識與生命教育。</p>
            </div>
          </div>
        </section>

        {/* Featured Rabbits - Placeholder */}
        <section className="py-20 bg-stone-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2 font-noto-sans-tc">等待家的孩子</h2>
                <p className="text-muted-foreground">他們都在等待一個溫暖的擁抱</p>
              </div>
              <Button variant="link" asChild>
                <Link href="/rabbits">查看更多 <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow border-none shadow-sm">
                  <div className="aspect-square bg-stone-200 relative">
                    {/* Placeholder for image */}
                    <div className="absolute inset-0 flex items-center justify-center text-stone-400">
                       Rabbit Image {i}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-bold text-lg">小白 {i}號</h3>
                       <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">開放認養</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">1歲 / 公 / 台北市</p>
                    <Button size="sm" className="w-full rounded-full" variant="secondary">詳細介紹</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
