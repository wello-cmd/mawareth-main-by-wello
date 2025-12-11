import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Calendar, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  const articles = [
    {
      title: "Understanding Sharia Inheritance: A Complete Guide for Egyptian Families",
      excerpt: "Learn the fundamentals of Islamic inheritance law, including fixed shares (Fard) and residual shares (Asabah), with practical examples from Egyptian cases.",
      author: "Dr. Fatima El-Sayed",
      date: "March 15, 2025",
      category: "Sharia Law",
      readTime: "8 min read",
    },
    {
      title: "5 Common Mistakes in Estate Division (And How to Avoid Them)",
      excerpt: "Discover the most frequent errors families make when dividing estates, from improper valuations to ignoring debt obligations, and learn how to avoid costly mistakes.",
      author: "Omar Khalil",
      date: "March 10, 2025",
      category: "Best Practices",
      readTime: "6 min read",
    },
    {
      title: "Estate Liquidity Solutions: Breaking the Inheritance Freeze",
      excerpt: "Explore how bank partnerships and buyout financing can help families resolve property inheritance disputes without years of waiting.",
      author: "Mohammed Waleed",
      date: "March 5, 2025",
      category: "Financial Solutions",
      readTime: "10 min read",
    },
    {
      title: "The Role of Women in Islamic Inheritance: Myths vs. Reality",
      excerpt: "A detailed examination of women's inheritance rights under Sharia law, addressing common misconceptions and explaining the wisdom behind Islamic rulings.",
      author: "Dr. Fatima El-Sayed",
      date: "February 28, 2025",
      category: "Sharia Law",
      readTime: "12 min read",
    },
    {
      title: "Navigating Egyptian Courts: Your Step-by-Step Inheritance Legal Guide",
      excerpt: "From filing initial paperwork to final court approval, understand the Egyptian legal process for inheritance cases and required documentation.",
      author: "Layla Mansour",
      date: "February 20, 2025",
      category: "Legal Process",
      readTime: "15 min read",
    },
    {
      title: "Digital vs. Traditional: Why Modern Inheritance Tools Matter",
      excerpt: "Compare traditional inheritance processing with digital solutions like Mawareth, and see how technology is transforming estate settlements in Egypt.",
      author: "Omar Khalil",
      date: "February 15, 2025",
      category: "Technology",
      readTime: "7 min read",
    },
    {
      title: "Complex Cases: Multiple Spouses, Half-Siblings, and Step-Children",
      excerpt: "Understand how Sharia law handles complex family structures, including guidance on distributing estates in non-traditional family arrangements.",
      author: "Dr. Fatima El-Sayed",
      date: "February 10, 2025",
      category: "Sharia Law",
      readTime: "14 min read",
    },
    {
      title: "Debt and Inheritance: What Gets Paid First?",
      excerpt: "Learn the Islamic and Egyptian legal requirements for settling debts before inheritance distribution, including priority order and documentation needed.",
      author: "Layla Mansour",
      date: "February 5, 2025",
      category: "Legal Process",
      readTime: "9 min read",
    },
    {
      title: "Case Study: How One Family Resolved a 5-Year Property Dispute",
      excerpt: "Real story of an Egyptian family that used Mawareth and liquidity solutions to end a half-decade standoff over an inherited apartment.",
      author: "Mohammed Waleed",
      date: "January 30, 2025",
      category: "Case Studies",
      readTime: "11 min read",
    },
  ];

  const categories = [
    "All Articles",
    "Sharia Law",
    "Legal Process",
    "Financial Solutions",
    "Best Practices",
    "Technology",
    "Case Studies",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Mawareth</span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button onClick={() => navigate('/calculator')}>Calculator</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Inheritance Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert guidance on Sharia law, Egyptian legal processes, and modern inheritance solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden hover:shadow-medium transition-all">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-primary/20 p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-4">Featured</div>
                    <p className="text-muted-foreground">Most Popular Article</p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {articles[0].category}
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {articles[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {articles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{articles[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{articles[0].date}</span>
                    </div>
                    <span>{articles[0].readTime}</span>
                  </div>
                  <Button>
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12">
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.slice(1).map((article, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-all flex flex-col">
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-4 self-start">
                  {article.category}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 flex-grow">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Informed
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for weekly insights on Sharia inheritance, legal updates, and family finance tips.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Mawareth</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Mawareth. Simplifying inheritance in Egypt.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
