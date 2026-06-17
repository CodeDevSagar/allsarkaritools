// 20+ Website Design Templates for AI Website Builder

export const websiteTemplates = {
  // 1. Modern SaaS Landing Page
  saasLanding: {
    name: "Modern SaaS",
    category: "Business",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaaS Product Landing</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; color: white; }
        .hero { padding: 100px 0; text-align: center; color: white; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 20px; font-weight: 800; }
        .hero p { font-size: 1.3rem; margin-bottom: 40px; opacity: 0.9; }
        .cta-btn { background: white; color: #667eea; padding: 15px 40px; border: none; border-radius: 50px; font-size: 1.1rem; font-weight: 600; cursor: pointer; box-shadow: 0 10px 30px rgba(0,0,0,0.2); transition: transform 0.3s; }
        .cta-btn:hover { transform: translateY(-3px); }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; padding: 80px 0; }
        .feature { background: white; padding: 40px; border-radius: 15px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
        .feature h3 { margin-bottom: 15px; color: #667eea; }
        @media (max-width: 768px) { .hero h1 { font-size: 2.5rem; } }
    </style>
</head>
<body>
    <div class="container">
        <nav>
            <div style="font-size: 1.8rem; font-weight: bold;">ProductName</div>
            <button class="cta-btn" style="background: transparent; color: white; box-shadow: none;">Sign In</button>
        </nav>
        <section class="hero">
            <h1>Powerful Tools, Simple Solution</h1>
            <p>Everything you need to succeed, in one beautiful platform</p>
            <button class="cta-btn">Start Free Trial</button>
        </section>
        <section class="features">
            <div class="feature">
                <h3>⚡ Lightning Fast</h3>
                <p>Optimized performance for seamless experience</p>
            </div>
            <div class="feature">
                <h3>🔒 Secure</h3>
                <p>Enterprise-grade security and compliance</p>
            </div>
            <div class="feature">
                <h3>📊 Analytics</h3>
                <p>Comprehensive insights and reporting</p>
            </div>
        </section>
    </div>
</body>
</html>`
  },

  // 2. E-commerce Store
  ecommerceStore: {
    name: "E-Commerce Store",
    category: "Retail",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Store</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: #f5f5f5; }
        header { background: #2c3e50; color: white; padding: 20px 0; display: flex; justify-content: space-between; align-items: center; padding: 20px 5%; }
        .logo { font-size: 1.8rem; font-weight: bold; }
        .search { padding: 10px 20px; width: 300px; border-radius: 5px; border: none; }
        .hero { background: linear-gradient(to right, #e74c3c, #c0392b); color: white; padding: 60px 5%; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; margin-bottom: 30px; }
        .btn { background: white; color: #e74c3c; padding: 12px 30px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
        .btn:hover { background: #ecf0f1; }
        .products { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; padding: 40px 5%; }
        .product { background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
        .product-img { width: 100%; height: 200px; background: linear-gradient(135deg, #667eea, #764ba2); }
        .product-info { padding: 15px; }
        .product-info h3 { margin-bottom: 10px; }
        .price { font-size: 1.5rem; color: #e74c3c; font-weight: bold; margin-bottom: 10px; }
    </style>
</head>
<body>
    <header>
        <div class="logo">ShopHub</div>
        <input type="text" class="search" placeholder="Search products...">
        <div>🛒 Cart</div>
    </header>
    <section class="hero">
        <h1>Summer Sale - 50% OFF</h1>
        <p>Limited time offer on selected items</p>
        <button class="btn">Shop Now</button>
    </section>
    <section class="products">
        <div class="product">
            <div class="product-img"></div>
            <div class="product-info">
                <h3>Product 1</h3>
                <div class="price">$29.99</div>
                <button class="btn">Add to Cart</button>
            </div>
        </div>
        <div class="product">
            <div class="product-img"></div>
            <div class="product-info">
                <h3>Product 2</h3>
                <div class="price">$39.99</div>
                <button class="btn">Add to Cart</button>
            </div>
        </div>
        <div class="product">
            <div class="product-img"></div>
            <div class="product-info">
                <h3>Product 3</h3>
                <div class="price">$49.99</div>
                <button class="btn">Add to Cart</button>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 3. Portfolio/Creative
  portfolioCreative: {
    name: "Creative Portfolio",
    category: "Portfolio",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creative Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Montserrat', sans-serif; background: #0a0e27; color: #fff; }
        nav { padding: 30px 5%; display: flex; justify-content: space-between; align-items: center; }
        .nav-links { display: flex; gap: 30px; }
        .nav-links a { color: #fff; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: #ff006e; }
        .hero { padding: 120px 5%; text-align: center; }
        .hero h1 { font-size: 4rem; margin-bottom: 20px; background: linear-gradient(to right, #ff006e, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero p { font-size: 1.2rem; color: #aaa; margin-bottom: 40px; }
        .cta { display: inline-block; background: linear-gradient(to right, #ff006e, #ff0080); padding: 15px 40px; border-radius: 50px; color: white; text-decoration: none; font-weight: bold; transition: transform 0.3s; }
        .cta:hover { transform: scale(1.05); }
        .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 80px 5%; }
        .gallery-item { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 300px; border-radius: 10px; cursor: pointer; transition: transform 0.3s; }
        .gallery-item:hover { transform: translateY(-10px); }
    </style>
</head>
<body>
    <nav>
        <div style="font-size: 1.8rem; font-weight: bold;">ALEX</div>
        <div class="nav-links">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>
    <section class="hero">
        <h1>Creative Designer & Developer</h1>
        <p>Crafting beautiful digital experiences</p>
        <a href="#" class="cta">View My Work</a>
    </section>
    <section class="gallery" id="work">
        <div class="gallery-item"></div>
        <div class="gallery-item"></div>
        <div class="gallery-item"></div>
        <div class="gallery-item"></div>
    </section>
</body>
</html>`
  },

  // 4. Restaurant Menu
  restaurantMenu: {
    name: "Restaurant Website",
    category: "Food & Beverage",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurant</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; background: #1a1a1a; color: #fff; }
        .header { background: linear-gradient(to right, #8b4513, #d2691e); padding: 40px 5%; text-align: center; }
        .header h1 { font-size: 3rem; margin-bottom: 10px; }
        .header p { font-size: 1.2rem; opacity: 0.9; }
        .menu { padding: 60px 5%; max-width: 1000px; margin: 0 auto; }
        .menu-section { margin-bottom: 50px; }
        .menu-section h2 { font-size: 2rem; margin-bottom: 30px; border-bottom: 3px solid #d2691e; padding-bottom: 10px; }
        .menu-item { margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-start; }
        .item-name { font-weight: bold; font-size: 1.2rem; }
        .item-desc { color: #aaa; font-size: 0.9rem; margin-top: 5px; }
        .item-price { color: #d2691e; font-weight: bold; font-size: 1.3rem; }
        .cta { text-align: center; padding: 40px 0; }
        .cta a { background: #d2691e; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🍽️ BELLA ITALIA</h1>
        <p>Authentic Italian Cuisine</p>
    </div>
    <div class="menu">
        <div class="menu-section">
            <h2>Appetizers</h2>
            <div class="menu-item">
                <div>
                    <div class="item-name">Bruschetta</div>
                    <div class="item-desc">Toasted bread with tomato and basil</div>
                </div>
                <div class="item-price">$8.99</div>
            </div>
            <div class="menu-item">
                <div>
                    <div class="item-name">Calamari Fritti</div>
                    <div class="item-desc">Crispy fried squid rings</div>
                </div>
                <div class="item-price">$10.99</div>
            </div>
        </div>
        <div class="menu-section">
            <h2>Main Courses</h2>
            <div class="menu-item">
                <div>
                    <div class="item-name">Spaghetti Carbonara</div>
                    <div class="item-desc">Classic Roman pasta with eggs and bacon</div>
                </div>
                <div class="item-price">$14.99</div>
            </div>
            <div class="menu-item">
                <div>
                    <div class="item-name">Osso Buco</div>
                    <div class="item-desc">Braised veal shanks in white wine</div>
                </div>
                <div class="item-price">$22.99</div>
            </div>
        </div>
    </div>
    <div class="cta">
        <a href="#">Reserve a Table</a>
    </div>
</body>
</html>`
  },

  // 5. Tech Startup
  techStartup: {
    name: "Tech Startup",
    category: "Technology",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Startup</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Roboto', sans-serif; background: #0f0f0f; color: #fff; }
        header { background: rgba(0,0,0,0.8); padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #00ff88; }
        .nav { display: flex; gap: 30px; }
        .nav a { color: #fff; text-decoration: none; }
        .hero { padding: 100px 5%; background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%); }
        .hero h1 { font-size: 3.5rem; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; color: #aaa; margin-bottom: 30px; }
        .hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .cta { background: #00ff88; color: #000; padding: 15px 35px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; font-size: 1rem; }
        .cta:hover { background: #00dd66; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; padding: 80px 5%; }
        .feature { padding: 30px; background: rgba(0,255,136,0.1); border-left: 3px solid #00ff88; border-radius: 5px; }
        .feature h3 { margin-bottom: 10px; color: #00ff88; }
    </style>
</head>
<body>
    <header>
        <div class="logo">TECHFLOW</div>
        <nav class="nav">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </nav>
    </header>
    <section class="hero">
        <div class="hero-content">
            <div>
                <h1>The Future of Development</h1>
                <p>Build faster, smarter, and better with our revolutionary platform.</p>
                <button class="cta">Get Started</button>
            </div>
            <div style="background: linear-gradient(135deg, #00ff88, #00d4ff); height: 300px; border-radius: 10px;"></div>
        </div>
    </section>
    <section class="features-grid">
        <div class="feature">
            <h3>⚙️ Automated</h3>
            <p>Automate repetitive tasks and focus on what matters</p>
        </div>
        <div class="feature">
            <h3>📈 Scalable</h3>
            <p>Grow from startup to enterprise without limits</p>
        </div>
        <div class="feature">
            <h3>🔌 Integrations</h3>
            <p>Connect with 1000+ tools and services</p>
        </div>
    </section>
</body>
</html>`
  },

  // 6. Agency Portfolio
  agencyPortfolio: {
    name: "Design Agency",
    category: "Agency",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Design Agency</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; background: #fff; }
        nav { padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; background: #f9f9f9; }
        .logo { font-size: 1.5rem; font-weight: bold; }
        .nav-links { display: flex; gap: 30px; }
        .nav-links a { color: #333; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: #ff3366; }
        .hero { padding: 100px 5%; text-align: center; }
        .hero h1 { font-size: 4rem; margin-bottom: 20px; color: #1a1a1a; }
        .hero p { font-size: 1.3rem; color: #666; margin-bottom: 30px; }
        .hero span { color: #ff3366; }
        .cta { background: #ff3366; color: white; padding: 15px 40px; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; font-size: 1rem; }
        .cta:hover { background: #ff1a4d; }
        .projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; padding: 80px 5%; }
        .project { border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .project:hover { transform: translateY(-5px); }
        .project-img { width: 100%; height: 250px; background: linear-gradient(135deg, #667eea, #764ba2); }
        .project-info { padding: 20px; }
        .project-info h3 { margin-bottom: 10px; }
        .project-info p { color: #666; font-size: 0.9rem; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">STUDIO</div>
        <div class="nav-links">
            <a href="#">Work</a>
            <a href="#">Team</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
        </div>
    </nav>
    <section class="hero">
        <h1>We Create <span>Digital Magic</span></h1>
        <p>Award-winning design and development for brands that inspire</p>
        <button class="cta">Start Your Project</button>
    </section>
    <section class="projects">
        <div class="project">
            <div class="project-img"></div>
            <div class="project-info">
                <h3>Brand Identity</h3>
                <p>Complete visual identity system</p>
            </div>
        </div>
        <div class="project">
            <div class="project-img"></div>
            <div class="project-info">
                <h3>Web Design</h3>
                <p>Modern responsive websites</p>
            </div>
        </div>
        <div class="project">
            <div class="project-img"></div>
            <div class="project-info">
                <h3>App Development</h3>
                <p>Native and cross-platform apps</p>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 7. Corporate Business
  corporateBusiness: {
    name: "Corporate Business",
    category: "Corporate",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Corporate Website</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, sans-serif; background: #f0f2f5; }
        header { background: #1c3a47; color: white; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.8rem; font-weight: bold; }
        .nav { display: flex; gap: 30px; }
        .nav a { color: white; text-decoration: none; }
        .hero { background: linear-gradient(to right, #1c3a47, #2d5a6f); color: white; padding: 80px 5%; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; }
        .cta { background: #00a8e8; color: white; padding: 15px 40px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
        .cta:hover { background: #0099d8; }
        .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; padding: 80px 5%; background: white; }
        .service { padding: 40px; background: #f9f9f9; border-radius: 8px; border-left: 4px solid #00a8e8; }
        .service h3 { margin-bottom: 15px; color: #1c3a47; }
        .team { padding: 80px 5%; }
        .team h2 { text-align: center; margin-bottom: 50px; font-size: 2.5rem; color: #1c3a47; }
        .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
        .team-member { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; }
        .team-member-img { width: 100%; height: 250px; background: linear-gradient(135deg, #667eea, #764ba2); }
        .team-member-info { padding: 20px; }
    </style>
</head>
<body>
    <header>
        <div class="logo">INNOVATE</div>
        <div class="nav">
            <a href="#">Services</a>
            <a href="#">Team</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </div>
    </header>
    <section class="hero">
        <h1>Business Solutions for Tomorrow</h1>
        <p>Transforming businesses with innovative technology</p>
        <button class="cta">Learn More</button>
    </section>
    <section class="services">
        <div class="service">
            <h3>💼 Consulting</h3>
            <p>Strategic business consulting for growth</p>
        </div>
        <div class="service">
            <h3>📊 Analytics</h3>
            <p>Data-driven insights for better decisions</p>
        </div>
        <div class="service">
            <h3>🚀 Implementation</h3>
            <p>Expert execution of complex projects</p>
        </div>
    </section>
    <section class="team">
        <h2>Our Leadership</h2>
        <div class="team-grid">
            <div class="team-member">
                <div class="team-member-img"></div>
                <div class="team-member-info">
                    <h4>John Smith</h4>
                    <p>Chief Executive Officer</p>
                </div>
            </div>
            <div class="team-member">
                <div class="team-member-img"></div>
                <div class="team-member-info">
                    <h4>Sarah Johnson</h4>
                    <p>Chief Technology Officer</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 8. Fitness/Gym
  fitnessGym: {
    name: "Fitness Gym",
    category: "Health & Fitness",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fitness Gym</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: #000; color: #fff; }
        nav { background: #1a1a1a; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.8rem; font-weight: bold; color: #ff6b35; }
        .hero { background: linear-gradient(135deg, #000 0%, #1a1a1a 50%, #ff6b35 100%); padding: 100px 5%; }
        .hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 20px; }
        .hero p { font-size: 1.1rem; margin-bottom: 30px; opacity: 0.9; }
        .cta { background: #ff6b35; color: white; padding: 15px 40px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; font-size: 1rem; }
        .cta:hover { background: #ff5520; }
        .hero-image { background: linear-gradient(135deg, #ff6b35, #ff8c42); height: 350px; border-radius: 10px; }
        .classes { padding: 80px 5%; }
        .classes h2 { text-align: center; margin-bottom: 50px; font-size: 2.5rem; }
        .classes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
        .class { background: #1a1a1a; padding: 30px; border-radius: 8px; border-top: 3px solid #ff6b35; text-align: center; }
        .class h3 { margin-bottom: 10px; }
        .class p { color: #aaa; margin-bottom: 15px; }
        .pricing { padding: 80px 5%; background: #1a1a1a; }
        .pricing h2 { text-align: center; margin-bottom: 50px; font-size: 2.5rem; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .plan { background: #000; padding: 40px; border: 2px solid #ff6b35; border-radius: 8px; text-align: center; }
        .plan h3 { margin-bottom: 15px; font-size: 1.5rem; }
        .plan .price { font-size: 2.5rem; color: #ff6b35; margin-bottom: 20px; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">💪 POWERFIT</div>
        <div style="display: flex; gap: 30px;">
            <a href="#" style="color: #fff; text-decoration: none;">Classes</a>
            <a href="#" style="color: #fff; text-decoration: none;">Pricing</a>
            <a href="#" style="color: #fff; text-decoration: none;">Contact</a>
        </div>
    </nav>
    <section class="hero">
        <div class="hero-content">
            <div>
                <h1>Transform Your Body</h1>
                <p>Join our community of fitness enthusiasts and achieve your goals</p>
                <button class="cta">Join Now</button>
            </div>
            <div class="hero-image"></div>
        </div>
    </section>
    <section class="classes">
        <h2>Our Classes</h2>
        <div class="classes-grid">
            <div class="class">
                <h3>🏃 HIIT Training</h3>
                <p>High intensity interval training</p>
                <p>Mon, Wed, Fri - 6:00 PM</p>
            </div>
            <div class="class">
                <h3>🧘 Yoga</h3>
                <p>Flexibility and mindfulness</p>
                <p>Tue, Thu, Sat - 7:00 AM</p>
            </div>
            <div class="class">
                <h3>⛹️ CrossFit</h3>
                <p>Functional fitness training</p>
                <p>Daily - 5:00 PM</p>
            </div>
        </div>
    </section>
    <section class="pricing">
        <h2>Membership Plans</h2>
        <div class="pricing-grid">
            <div class="plan">
                <h3>Basic</h3>
                <div class="price">$29</div>
                <p>/month</p>
                <button class="cta">Get Started</button>
            </div>
            <div class="plan">
                <h3>Premium</h3>
                <div class="price">$59</div>
                <p>/month</p>
                <button class="cta">Get Started</button>
            </div>
            <div class="plan">
                <h3>Elite</h3>
                <div class="price">$99</div>
                <p>/month</p>
                <button class="cta">Get Started</button>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 9. Real Estate
  realEstate: {
    name: "Real Estate",
    category: "Real Estate",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real Estate</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: #f5f5f5; }
        nav { background: white; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .logo { font-size: 1.8rem; font-weight: bold; color: #d4a574; }
        .search-bar { flex: 1; margin: 0 30px; }
        .search-bar input { width: 100%; padding: 12px; border: 2px solid #eee; border-radius: 5px; }
        .hero { background: linear-gradient(135deg, #d4a574 0%, #a37850 100%); color: white; padding: 80px 5%; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; margin-bottom: 30px; }
        .cta { background: white; color: #d4a574; padding: 12px 30px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
        .cta:hover { background: #f5f5f5; }
        .listings { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; padding: 60px 5%; }
        .listing { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .listing-img { width: 100%; height: 250px; background: linear-gradient(135deg, #d4a574, #a37850); }
        .listing-info { padding: 20px; }
        .listing-price { font-size: 1.8rem; color: #d4a574; font-weight: bold; margin-bottom: 10px; }
        .listing-address { color: #666; margin-bottom: 15px; }
        .listing-details { display: flex; gap: 20px; color: #999; font-size: 0.9rem; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">🏠 ESTATE PRO</div>
        <div class="search-bar">
            <input type="text" placeholder="Search properties...">
        </div>
        <button class="cta" style="background: #d4a574; color: white;">List Property</button>
    </nav>
    <section class="hero">
        <h1>Find Your Dream Home</h1>
        <p>Browse thousands of properties in prime locations</p>
        <button class="cta">Start Searching</button>
    </section>
    <section class="listings">
        <div class="listing">
            <div class="listing-img"></div>
            <div class="listing-info">
                <div class="listing-price">$450,000</div>
                <div class="listing-address">123 Oak Street, Downtown</div>
                <div class="listing-details">
                    <span>3 Bed</span>
                    <span>2 Bath</span>
                    <span>2,200 sqft</span>
                </div>
            </div>
        </div>
        <div class="listing">
            <div class="listing-img"></div>
            <div class="listing-info">
                <div class="listing-price">$650,000</div>
                <div class="listing-address">456 Maple Ave, Suburbs</div>
                <div class="listing-details">
                    <span>4 Bed</span>
                    <span>3 Bath</span>
                    <span>3,100 sqft</span>
                </div>
            </div>
        </div>
        <div class="listing">
            <div class="listing-img"></div>
            <div class="listing-info">
                <div class="listing-price">$350,000</div>
                <div class="listing-address">789 Pine Road, Waterfront</div>
                <div class="listing-details">
                    <span>2 Bed</span>
                    <span>2 Bath</span>
                    <span>1,800 sqft</span>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 10. Educational/Online Course
  educationCourse: {
    name: "Online Education",
    category: "Education",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Education Platform</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f8f9fa; }
        nav { background: white; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .logo { font-size: 1.5rem; font-weight: bold; color: #4285f4; }
        .nav-links { display: flex; gap: 30px; }
        .nav-links a { color: #333; text-decoration: none; }
        .hero { background: linear-gradient(135deg, #4285f4 0%, #5e35b1 100%); color: white; padding: 80px 5%; }
        .hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .hero h1 { font-size: 3rem; margin-bottom: 20px; }
        .hero p { font-size: 1.1rem; margin-bottom: 30px; opacity: 0.9; }
        .cta { background: white; color: #4285f4; padding: 15px 40px; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; font-size: 1rem; }
        .cta:hover { background: #f1f1f1; }
        .hero-image { background: rgba(255,255,255,0.1); height: 300px; border-radius: 10px; }
        .courses { padding: 80px 5%; }
        .courses h2 { text-align: center; margin-bottom: 50px; font-size: 2.5rem; color: #333; }
        .courses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .course { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .course:hover { transform: translateY(-5px); }
        .course-img { width: 100%; height: 180px; background: linear-gradient(135deg, #4285f4, #5e35b1); }
        .course-info { padding: 20px; }
        .course-title { font-weight: bold; margin-bottom: 10px; }
        .course-desc { color: #666; font-size: 0.9rem; margin-bottom: 15px; }
        .course-price { color: #4285f4; font-weight: bold; font-size: 1.2rem; margin-bottom: 10px; }
        .course-btn { background: #4285f4; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; width: 100%; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">📚 LEARNHUB</div>
        <div class="nav-links">
            <a href="#">Courses</a>
            <a href="#">Instructors</a>
            <a href="#">Pricing</a>
            <a href="#">Contact</a>
        </div>
    </nav>
    <section class="hero">
        <div class="hero-content">
            <div>
                <h1>Learn Anything Online</h1>
                <p>Access thousands of courses taught by industry experts. Learn at your own pace.</p>
                <button class="cta">Explore Courses</button>
            </div>
            <div class="hero-image"></div>
        </div>
    </section>
    <section class="courses">
        <h2>Featured Courses</h2>
        <div class="courses-grid">
            <div class="course">
                <div class="course-img"></div>
                <div class="course-info">
                    <div class="course-title">Web Development Masterclass</div>
                    <div class="course-desc">Learn HTML, CSS, JavaScript and more</div>
                    <div class="course-price">$49.99</div>
                    <button class="course-btn">Enroll Now</button>
                </div>
            </div>
            <div class="course">
                <div class="course-img"></div>
                <div class="course-info">
                    <div class="course-title">Python for Beginners</div>
                    <div class="course-desc">Start your coding journey with Python</div>
                    <div class="course-price">$39.99</div>
                    <button class="course-btn">Enroll Now</button>
                </div>
            </div>
            <div class="course">
                <div class="course-img"></div>
                <div class="course-info">
                    <div class="course-title">UI/UX Design Course</div>
                    <div class="course-desc">Master modern design principles</div>
                    <div class="course-price">$59.99</div>
                    <button class="course-btn">Enroll Now</button>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 11. Travel Agency
  travelAgency: {
    name: "Travel Agency",
    category: "Travel & Tourism",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Travel Agency</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; background: #fff; }
        nav { background: white; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .logo { font-size: 1.8rem; font-weight: bold; color: #ff6b9d; }
        .nav-links { display: flex; gap: 25px; }
        .nav-links a { color: #333; text-decoration: none; }
        .hero { background: linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%); color: white; padding: 100px 5%; text-align: center; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; margin-bottom: 30px; }
        .cta { background: white; color: #ff6b9d; padding: 15px 40px; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; }
        .cta:hover { background: #f0f0f0; }
        .destinations { padding: 80px 5%; }
        .destinations h2 { text-align: center; margin-bottom: 50px; font-size: 2.5rem; color: #333; }
        .destinations-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .destination { position: relative; height: 300px; border-radius: 10px; overflow: hidden; cursor: pointer; }
        .destination-img { width: 100%; height: 100%; background: linear-gradient(135deg, #ff6b9d, #c06c84); }
        .destination-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); color: white; padding: 30px; }
        .destination h3 { font-size: 1.8rem; margin-bottom: 10px; }
        .destination p { opacity: 0.9; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">✈️ WANDERLUST</div>
        <div class="nav-links">
            <a href="#">Destinations</a>
            <a href="#">Packages</a>
            <a href="#">About</a>
            <a href="#">Book Now</a>
        </div>
    </nav>
    <section class="hero">
        <h1>Explore the World</h1>
        <p>Discover amazing destinations and create unforgettable memories</p>
        <button class="cta">Browse Packages</button>
    </section>
    <section class="destinations">
        <h2>Popular Destinations</h2>
        <div class="destinations-grid">
            <div class="destination">
                <div class="destination-img"></div>
                <div class="destination-overlay">
                    <h3>Bali, Indonesia</h3>
                    <p>From $899</p>
                </div>
            </div>
            <div class="destination">
                <div class="destination-img"></div>
                <div class="destination-overlay">
                    <h3>Paris, France</h3>
                    <p>From $1,299</p>
                </div>
            </div>
            <div class="destination">
                <div class="destination-img"></div>
                <div class="destination-overlay">
                    <h3>Tokyo, Japan</h3>
                    <p>From $1,099</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 12. Blog/Magazine
  blogMagazine: {
    name: "Blog & Magazine",
    category: "Media",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog & Magazine</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; background: #fafaf8; color: #333; }
        header { background: white; padding: 30px 5%; border-bottom: 1px solid #eee; }
        .logo { font-size: 2rem; font-weight: bold; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 80px 5%; text-align: center; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; margin-bottom: 30px; }
        .featured { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 80px 5%; max-width: 1200px; margin: 0 auto; align-items: center; }
        .featured-img { background: linear-gradient(135deg, #667eea, #764ba2); height: 300px; border-radius: 10px; }
        .featured-content h2 { font-size: 2.5rem; margin-bottom: 20px; }
        .featured-content p { line-height: 1.8; margin-bottom: 20px; color: #666; }
        .read-more { color: #667eea; text-decoration: none; font-weight: bold; }
        .posts { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; padding: 80px 5%; }
        .post { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: transform 0.3s; }
        .post:hover { transform: translateY(-5px); }
        .post-img { width: 100%; height: 200px; background: linear-gradient(135deg, #667eea, #764ba2); }
        .post-content { padding: 25px; }
        .post-date { color: #999; font-size: 0.9rem; margin-bottom: 10px; }
        .post-title { font-size: 1.3rem; margin-bottom: 10px; }
        .post-excerpt { color: #666; line-height: 1.6; }
    </style>
</head>
<body>
    <header>
        <div class="logo">📰 DAILYBLOG</div>
    </header>
    <section class="hero">
        <h1>Stories Worth Reading</h1>
        <p>Stay informed with our latest articles and insights</p>
    </section>
    <section class="featured">
        <div class="featured-img"></div>
        <div class="featured-content">
            <h2>Featured Story</h2>
            <p>Discover the latest trends and insights from industry experts. This comprehensive guide covers everything you need to know about modern web design and development.</p>
            <a href="#" class="read-more">Read Full Article →</a>
        </div>
    </section>
    <section class="posts">
        <article class="post">
            <div class="post-img"></div>
            <div class="post-content">
                <div class="post-date">June 15, 2024</div>
                <h3 class="post-title">Getting Started with Web Design</h3>
                <p class="post-excerpt">Learn the fundamentals of modern web design and create beautiful websites...</p>
            </div>
        </article>
        <article class="post">
            <div class="post-img"></div>
            <div class="post-content">
                <div class="post-date">June 14, 2024</div>
                <h3 class="post-title">10 UI/UX Principles</h3>
                <p class="post-excerpt">Master the essential design principles that make interfaces intuitive...</p>
            </div>
        </article>
        <article class="post">
            <div class="post-img"></div>
            <div class="post-content">
                <div class="post-date">June 13, 2024</div>
                <h3 class="post-title">Future of Web Development</h3>
                <p class="post-excerpt">Explore upcoming trends and technologies shaping the web...</p>
            </div>
        </article>
    </section>
</body>
</html>`
  },

  // 13. Fashion/Clothing Brand
  fashionBrand: {
    name: "Fashion Brand",
    category: "Fashion",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fashion Brand</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; background: #fff; }
        nav { padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; background: #f9f9f9; }
        .logo { font-size: 1.8rem; font-weight: bold; color: #000; }
        .nav-right { display: flex; gap: 20px; }
        .hero { background: linear-gradient(135deg, #000, #333); color: white; padding: 120px 5%; text-align: center; }
        .hero h1 { font-size: 4rem; margin-bottom: 20px; font-weight: 300; letter-spacing: 2px; }
        .hero p { font-size: 1.1rem; margin-bottom: 30px; font-weight: 300; }
        .cta { background: white; color: black; padding: 15px 40px; border: none; border-radius: 0; font-weight: bold; cursor: pointer; }
        .cta:hover { background: #f0f0f0; }
        .collection { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 80px 5%; }
        .item { position: relative; overflow: hidden; background: #f5f5f5; }
        .item-img { width: 100%; height: 350px; background: linear-gradient(135deg, #ddd, #999); }
        .item-info { padding: 20px; text-align: center; }
        .item-name { font-weight: bold; margin-bottom: 10px; }
        .item-price { color: #666; margin-bottom: 10px; }
        .item-btn { background: black; color: white; padding: 10px 20px; border: none; cursor: pointer; width: 100%; }
        .item-btn:hover { background: #333; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">LUXURY</div>
        <div class="nav-right">
            <a href="#" style="text-decoration: none; color: black;">Collection</a>
            <a href="#" style="text-decoration: none; color: black;">About</a>
            <a href="#" style="text-decoration: none; color: black;">🛍️</a>
        </div>
    </nav>
    <section class="hero">
        <h1>Spring Collection 2024</h1>
        <p>Timeless elegance meets modern design</p>
        <button class="cta">Shop Collection</button>
    </section>
    <section class="collection">
        <div class="item">
            <div class="item-img"></div>
            <div class="item-info">
                <div class="item-name">Classic Blazer</div>
                <div class="item-price">$199</div>
                <button class="item-btn">View</button>
            </div>
        </div>
        <div class="item">
            <div class="item-img"></div>
            <div class="item-info">
                <div class="item-name">Silk Dress</div>
                <div class="item-price">$299</div>
                <button class="item-btn">View</button>
            </div>
        </div>
        <div class="item">
            <div class="item-img"></div>
            <div class="item-info">
                <div class="item-name">Premium Jeans</div>
                <div class="item-price">$129</div>
                <button class="item-btn">View</button>
            </div>
        </div>
        <div class="item">
            <div class="item-img"></div>
            <div class="item-info">
                <div class="item-name">White Shirt</div>
                <div class="item-price">$89</div>
                <button class="item-btn">View</button>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 14. Service-Based Business
  servicesBusiness: {
    name: "Service Business",
    category: "Services",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Services</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: white; }
        nav { background: #2c3e50; color: white; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; }
        .hero { background: linear-gradient(to right, #3498db, #2c3e50); color: white; padding: 100px 5%; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 20px; }
        .hero p { font-size: 1.1rem; margin-bottom: 30px; opacity: 0.9; }
        .cta { background: #e74c3c; color: white; padding: 15px 40px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
        .cta:hover { background: #c0392b; }
        .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; padding: 80px 5%; background: #ecf0f1; }
        .service { background: white; padding: 40px; border-radius: 8px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .service-icon { font-size: 3rem; margin-bottom: 20px; }
        .service h3 { margin-bottom: 15px; color: #2c3e50; }
        .service p { color: #666; line-height: 1.6; }
        .testimonials { padding: 80px 5%; background: white; }
        .testimonials h2 { text-align: center; margin-bottom: 50px; font-size: 2.5rem; color: #2c3e50; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .testimonial { background: #ecf0f1; padding: 30px; border-radius: 8px; border-left: 4px solid #3498db; }
        .testimonial p { margin-bottom: 15px; color: #333; }
        .testimonial-author { font-weight: bold; color: #2c3e50; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">ProServices</div>
        <div style="display: flex; gap: 30px;">
            <a href="#" style="color: white; text-decoration: none;">Services</a>
            <a href="#" style="color: white; text-decoration: none;">About</a>
            <a href="#" style="color: white; text-decoration: none;">Contact</a>
        </div>
    </nav>
    <section class="hero">
        <h1>Expert Professional Services</h1>
        <p>Quality solutions tailored to your needs</p>
        <button class="cta">Get Started</button>
    </section>
    <section class="services">
        <div class="service">
            <div class="service-icon">📋</div>
            <h3>Consulting</h3>
            <p>Expert guidance for your business challenges</p>
        </div>
        <div class="service">
            <div class="service-icon">🛠️</div>
            <h3>Implementation</h3>
            <p>Professional execution of your projects</p>
        </div>
        <div class="service">
            <div class="service-icon">📊</div>
            <h3>Analysis</h3>
            <p>Data-driven insights for better decisions</p>
        </div>
    </section>
    <section class="testimonials">
        <h2>What Our Clients Say</h2>
        <div class="testimonials-grid">
            <div class="testimonial">
                <p>"Outstanding service and professional team. Highly recommended!"</p>
                <div class="testimonial-author">- John Smith, CEO</div>
            </div>
            <div class="testimonial">
                <p>"Exceeded our expectations. Great results and amazing support."</p>
                <div class="testimonial-author">- Sarah Johnson, Manager</div>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 15. Minimalist Landing Page
  minimalistLanding: {
    name: "Minimalist Landing",
    category: "Startup",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple & Clean</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: white; color: #222; }
        nav { padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.3rem; font-weight: 600; }
        .nav-links { display: flex; gap: 30px; }
        .nav-links a { color: #666; text-decoration: none; transition: color 0.3s; }
        .nav-links a:hover { color: #000; }
        .hero { padding: 120px 5%; text-align: center; max-width: 800px; margin: 0 auto; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 20px; line-height: 1.2; font-weight: 700; }
        .hero p { font-size: 1.2rem; color: #666; margin-bottom: 40px; line-height: 1.6; }
        .cta { background: #000; color: white; padding: 14px 35px; border: none; border-radius: 3px; font-weight: 600; cursor: pointer; transition: background 0.3s; }
        .cta:hover { background: #333; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; padding: 100px 5%; max-width: 1200px; margin: 0 auto; }
        .feature h3 { margin-bottom: 10px; font-size: 1.2rem; }
        .feature p { color: #666; line-height: 1.6; }
        footer { padding: 40px 5%; text-align: center; color: #999; border-top: 1px solid #eee; margin-top: 80px; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">product</div>
        <div class="nav-links">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Docs</a>
            <a href="#">Contact</a>
        </div>
    </nav>
    <section class="hero">
        <h1>Build Better, Faster</h1>
        <p>A simple, elegant solution for modern builders. No complexity. No bloat. Just what you need.</p>
        <button class="cta">Get Started Free</button>
    </section>
    <section class="features">
        <div class="feature">
            <h3>Simple</h3>
            <p>Clean interfaces that get out of your way</p>
        </div>
        <div class="feature">
            <h3>Fast</h3>
            <p>Lightning quick performance built in</p>
        </div>
        <div class="feature">
            <h3>Reliable</h3>
            <p>Enterprise-grade stability and uptime</p>
        </div>
    </section>
    <footer>
        <p>© 2024 Product Inc. All rights reserved.</p>
    </footer>
</body>
</html>`
  },

  // 16. Luxury Hotel
  luxuryHotel: {
    name: "Luxury Hotel",
    category: "Hospitality",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Luxury Hotel</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; background: #f5f1e8; color: #333; }
        nav { padding: 30px 5%; display: flex; justify-content: space-between; align-items: center; background: white; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #8b7355; }
        .nav-links { display: flex; gap: 30px; }
        .nav-links a { color: #333; text-decoration: none; }
        .hero { background: linear-gradient(135deg, #8b7355 0%, #d4a574 100%); color: white; padding: 120px 5%; text-align: center; }
        .hero h1 { font-size: 4rem; margin-bottom: 20px; font-weight: 300; }
        .hero p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; }
        .cta { background: white; color: #8b7355; padding: 15px 40px; border: none; border-radius: 0; font-weight: bold; cursor: pointer; }
        .rooms { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; padding: 80px 5%; }
        .room { background: white; border-radius: 0; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .room-img { width: 100%; height: 250px; background: linear-gradient(135deg, #8b7355, #d4a574); }
        .room-info { padding: 30px; }
        .room-name { font-size: 1.5rem; margin-bottom: 10px; color: #8b7355; }
        .room-desc { color: #666; margin-bottom: 15px; line-height: 1.6; }
        .room-price { font-size: 1.8rem; color: #8b7355; font-weight: bold; margin-bottom: 15px; }
        .room-btn { background: #8b7355; color: white; padding: 10px 20px; border: none; cursor: pointer; width: 100%; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">🏨 GRAND PALACE</div>
        <div class="nav-links">
            <a href="#">Rooms</a>
            <a href="#">Amenities</a>
            <a href="#">Dining</a>
            <a href="#">Bookings</a>
        </div>
    </nav>
    <section class="hero">
        <h1>Experience Luxury</h1>
        <p>Your sanctuary awaits with world-class amenities and impeccable service</p>
        <button class="cta">Book Your Stay</button>
    </section>
    <section class="rooms">
        <div class="room">
            <div class="room-img"></div>
            <div class="room-info">
                <div class="room-name">Standard Room</div>
                <div class="room-desc">Comfortable and spacious with city views</div>
                <div class="room-price">$199/night</div>
                <button class="room-btn">Book Now</button>
            </div>
        </div>
        <div class="room">
            <div class="room-img"></div>
            <div class="room-info">
                <div class="room-name">Deluxe Suite</div>
                <div class="room-desc">Premium suite with premium amenities</div>
                <div class="room-price">$399/night</div>
                <button class="room-btn">Book Now</button>
            </div>
        </div>
        <div class="room">
            <div class="room-img"></div>
            <div class="room-info">
                <div class="room-name">Presidential Suite</div>
                <div class="room-desc">Ultimate luxury with exclusive services</div>
                <div class="room-price">$799/night</div>
                <button class="room-btn">Book Now</button>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 17. Marketing Agency
  marketingAgency: {
    name: "Marketing Agency",
    category: "Agency",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketing Agency</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; background: #0a0a0a; color: #fff; }
        nav { padding: 25px 5%; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; background: linear-gradient(to right, #ff006e, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .nav-links { display: flex; gap: 30px; }
        .nav-links a { color: #aaa; text-decoration: none; }
        .hero { padding: 100px 5%; text-align: center; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%); }
        .hero h1 { font-size: 4rem; margin-bottom: 20px; background: linear-gradient(to right, #ff006e, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero p { font-size: 1.2rem; color: #aaa; margin-bottom: 30px; }
        .cta { background: linear-gradient(to right, #ff006e, #00d4ff); color: white; padding: 15px 40px; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; }
        .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; padding: 80px 5%; }
        .service { background: rgba(255,0,110,0.1); border: 1px solid rgba(255,0,110,0.3); padding: 40px; border-radius: 8px; }
        .service h3 { margin-bottom: 15px; color: #00d4ff; }
        .service p { color: #aaa; }
        .portfolio { padding: 80px 5%; }
        .portfolio h2 { text-align: center; margin-bottom: 50px; font-size: 2.5rem; }
        .portfolio-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
        .portfolio-item { background: linear-gradient(135deg, #ff006e, #00d4ff); height: 250px; border-radius: 8px; cursor: pointer; transition: transform 0.3s; }
        .portfolio-item:hover { transform: scale(1.05); }
    </style>
</head>
<body>
    <nav>
        <div class="logo">WAVE</div>
        <div class="nav-links">
            <a href="#">Services</a>
            <a href="#">Portfolio</a>
            <a href="#">Team</a>
            <a href="#">Contact</a>
        </div>
    </nav>
    <section class="hero">
        <h1>Marketing That Moves</h1>
        <p>Creative campaigns that drive real results</p>
        <button class="cta">Start Your Campaign</button>
    </section>
    <section class="services">
        <div class="service">
            <h3>🎯 Strategy</h3>
            <p>Data-driven marketing strategies</p>
        </div>
        <div class="service">
            <h3>✨ Creative</h3>
            <p>Award-winning creative design</p>
        </div>
        <div class="service">
            <h3>📱 Digital</h3>
            <p>Multi-channel digital campaigns</p>
        </div>
    </section>
    <section class="portfolio">
        <h2>Recent Campaigns</h2>
        <div class="portfolio-grid">
            <div class="portfolio-item"></div>
            <div class="portfolio-item"></div>
            <div class="portfolio-item"></div>
            <div class="portfolio-item"></div>
        </div>
    </section>
</body>
</html>`
  },

  // 18. Software Company
  softwareCompany: {
    name: "Software Company",
    category: "Technology",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Software Company</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Roboto', sans-serif; background: #ffffff; color: #333; }
        nav { background: white; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .logo { font-size: 1.5rem; font-weight: bold; color: #2563eb; }
        .nav-links { display: flex; gap: 30px; }
        .nav-links a { color: #666; text-decoration: none; }
        .hero { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 100px 5%; }
        .hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 20px; }
        .hero p { font-size: 1.1rem; margin-bottom: 30px; opacity: 0.9; }
        .cta { background: white; color: #2563eb; padding: 15px 40px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
        .hero-img { background: rgba(255,255,255,0.1); height: 300px; border-radius: 10px; }
        .solutions { padding: 80px 5%; background: #f9fafb; }
        .solutions h2 { text-align: center; margin-bottom: 50px; font-size: 2.5rem; }
        .solutions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .solution { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .solution h3 { margin-bottom: 15px; color: #2563eb; }
        .solution p { color: #666; line-height: 1.6; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">SoftWare+</div>
        <div class="nav-links">
            <a href="#">Products</a>
            <a href="#">Solutions</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
        </div>
    </nav>
    <section class="hero">
        <div class="hero-content">
            <div>
                <h1>Enterprise Software Solutions</h1>
                <p>Powerful tools designed for modern businesses</p>
                <button class="cta">Try Free for 14 Days</button>
            </div>
            <div class="hero-img"></div>
        </div>
    </section>
    <section class="solutions">
        <h2>Our Solutions</h2>
        <div class="solutions-grid">
            <div class="solution">
                <h3>💼 Business Suite</h3>
                <p>Complete business management tools in one platform</p>
            </div>
            <div class="solution">
                <h3>📊 Analytics Pro</h3>
                <p>Advanced analytics and reporting capabilities</p>
            </div>
            <div class="solution">
                <h3>🔐 Security Plus</h3>
                <p>Enterprise-grade security and compliance</p>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 19. Nonprofit Organization
  nonprofit: {
    name: "Nonprofit Organization",
    category: "Nonprofit",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nonprofit Organization</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #f5f5f5; }
        nav { background: #1b4d3e; color: white; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 1.5rem; font-weight: bold; }
        .nav-links { display: flex; gap: 25px; }
        .nav-links a { color: white; text-decoration: none; }
        .hero { background: linear-gradient(to right, #1b4d3e, #2d7059); color: white; padding: 100px 5%; text-align: center; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 20px; }
        .hero p { font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9; }
        .cta { background: #f39c12; color: white; padding: 15px 40px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
        .cta:hover { background: #e67e22; }
        .mission { padding: 80px 5%; background: white; text-align: center; }
        .mission h2 { font-size: 2.5rem; margin-bottom: 20px; color: #1b4d3e; }
        .mission p { color: #666; font-size: 1.1rem; line-height: 1.8; max-width: 800px; margin: 0 auto; }
        .programs { padding: 80px 5%; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
        .program { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center; border-top: 4px solid #f39c12; }
        .program h3 { margin-bottom: 15px; color: #1b4d3e; }
        .impact { padding: 80px 5%; background: linear-gradient(135deg, #1b4d3e 0%, #2d7059 100%); color: white; text-align: center; }
        .impact h2 { font-size: 2.5rem; margin-bottom: 50px; }
        .impact-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; }
        .stat { font-size: 2.5rem; font-weight: bold; }
    </style>
</head>
<body>
    <nav>
        <div class="logo">🌿 GREENWATCH</div>
        <div class="nav-links">
            <a href="#">Mission</a>
            <a href="#">Programs</a>
            <a href="#">Donate</a>
            <a href="#">Contact</a>
        </div>
    </nav>
    <section class="hero">
        <h1>Making a Difference</h1>
        <p>Fighting for a sustainable future for all</p>
        <button class="cta">Support Our Cause</button>
    </section>
    <section class="mission">
        <h2>Our Mission</h2>
        <p>To protect our environment and promote sustainable practices through education, advocacy, and direct action. Together we can create a better world for future generations.</p>
    </section>
    <section class="programs">
        <div class="program">
            <h3>🌍 Environmental Education</h3>
            <p>Teaching communities about sustainability</p>
        </div>
        <div class="program">
            <h3>♻️ Conservation Projects</h3>
            <p>Protecting wildlife and natural habitats</p>
        </div>
        <div class="program">
            <h3>🤝 Community Outreach</h3>
            <p>Building grassroots environmental awareness</p>
        </div>
    </section>
    <section class="impact">
        <h2>Our Impact</h2>
        <div class="impact-stats">
            <div>
                <div class="stat">1M+</div>
                <p>People Reached</p>
            </div>
            <div>
                <div class="stat">500+</div>
                <p>Projects Completed</p>
            </div>
            <div>
                <div class="stat">100K+</div>
                <p>Trees Planted</p>
            </div>
        </div>
    </section>
</body>
</html>`
  },

  // 20. News Portal
  newsPortal: {
    name: "News Portal",
    category: "Media",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>News Portal</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; background: #fff; }
        header { background: #1a1a1a; color: white; padding: 20px 5%; }
        .header-content { display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 2rem; font-weight: bold; }
        .search-box { padding: 10px 20px; border-radius: 5px; border: none; width: 300px; }
        .featured { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 5%; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .featured-img { background: rgba(255,255,255,0.2); height: 300px; border-radius: 8px; }
        .featured h2 { font-size: 2.5rem; margin-bottom: 15px; }
        .featured p { margin-bottom: 20px; opacity: 0.9; }
        .read-more { color: white; text-decoration: none; font-weight: bold; }
        .latest-news { padding: 60px 5%; }
        .latest-news h3 { font-size: 1.8rem; margin-bottom: 40px; border-bottom: 3px solid #1a1a1a; padding-bottom: 15px; }
        .news-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .news-item { border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
        .news-img { width: 100%; height: 200px; background: linear-gradient(135deg, #667eea, #764ba2); }
        .news-content { padding: 20px; }
        .news-category { color: #667eea; font-weight: bold; font-size: 0.85rem; }
        .news-title { font-size: 1.2rem; margin-bottom: 10px; }
        .news-excerpt { color: #666; line-height: 1.6; }
        .news-meta { color: #999; font-size: 0.9rem; margin-top: 10px; }
    </style>
</head>
<body>
    <header>
        <div class="header-content">
            <div class="logo">📰 DAILYNEWS</div>
            <input type="text" class="search-box" placeholder="Search news...">
            <div>Subscribe</div>
        </div>
    </header>
    <section class="featured">
        <div class="featured-img"></div>
        <div>
            <h2>Breaking News</h2>
            <p>Latest developments in technology and innovation reshaping our world. Explore the most important stories of today.</p>
            <a href="#" class="read-more">Read Full Story →</a>
        </div>
    </section>
    <section class="latest-news">
        <h3>Latest Stories</h3>
        <div class="news-grid">
            <article class="news-item">
                <div class="news-img"></div>
                <div class="news-content">
                    <div class="news-category">TECHNOLOGY</div>
                    <h4 class="news-title">AI Breakthrough Announced</h4>
                    <p class="news-excerpt">Scientists announce major breakthrough in artificial intelligence...</p>
                    <div class="news-meta">June 15, 2024</div>
                </div>
            </article>
            <article class="news-item">
                <div class="news-img"></div>
                <div class="news-content">
                    <div class="news-category">BUSINESS</div>
                    <h4 class="news-title">Market Reaches New High</h4>
                    <p class="news-excerpt">Global stock markets hit record highs following positive economic data...</p>
                    <div class="news-meta">June 15, 2024</div>
                </div>
            </article>
            <article class="news-item">
                <div class="news-img"></div>
                <div class="news-content">
                    <div class="news-category">WORLD</div>
                    <h4 class="news-title">International Summit Begins</h4>
                    <p class="news-excerpt">World leaders gather for annual international conference...</p>
                    <div class="news-meta">June 14, 2024</div>
                </div>
            </article>
        </div>
    </section>
</body>
</html>`
  },
};

export const categoryTemplates = {
  Business: ['saasLanding', 'corporateBusiness', 'softwareCompany'],
  Retail: ['ecommerceStore', 'fashionBrand'],
  Portfolio: ['portfolioCreative', 'agencyPortfolio'],
  'Food & Beverage': ['restaurantMenu'],
  Technology: ['techStartup', 'softwareCompany'],
  Agency: ['agencyPortfolio', 'marketingAgency'],
  'Health & Fitness': ['fitnessGym'],
  'Real Estate': ['realEstate'],
  Education: ['educationCourse'],
  'Travel & Tourism': ['travelAgency'],
  Media: ['blogMagazine', 'newsPortal'],
  Fashion: ['fashionBrand'],
  Services: ['servicesBusiness'],
  Startup: ['minimalistLanding'],
  Hospitality: ['luxuryHotel'],
  Nonprofit: ['nonprofit'],
};

export default websiteTemplates;
