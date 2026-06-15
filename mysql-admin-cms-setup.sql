-- Shared-hosting setup:
-- Select the database assigned by your host in phpMyAdmin before running this file.
-- Database and user creation is managed by the hosting control panel.

CREATE TABLE IF NOT EXISTS blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(220) NOT NULL,
  slug VARCHAR(240) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(120) NOT NULL,
  image_url VARCHAR(500) NULL,
  published_at DATE NULL,
  read_time VARCHAR(40) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  is_published TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_blog_posts_public (is_published, sort_order, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(120) PRIMARY KEY,
  setting_value JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO site_settings (setting_key, setting_value)
VALUES (
  'contact_page',
  JSON_OBJECT(
    'bannerTitle', 'Contact Us',
    'bannerSubtitle', 'Get in touch with our solar experts',
    'infoTitle', 'Get In Touch',
    'formTitle', 'Send Us a Message',
    'puneTitle', 'Pune Rooftop Solar Snapshot',
    'puneSubtitle', 'Quick overview for Pune homeowners based on publicly available market benchmarks and subsidy-aligned residential estimates.'
  )
)
ON DUPLICATE KEY UPDATE setting_key = setting_key;

INSERT INTO blog_posts
  (title, slug, excerpt, content, category, image_url, published_at, read_time, sort_order, is_featured, is_published)
VALUES
  (
    'How to Plan a Rooftop Solar System That Pays Back Faster',
    'plan-rooftop-solar-system-faster-payback',
    'A practical guide to matching system size, bill patterns, subsidy eligibility, and installation quality before you invest in rooftop solar.',
    'Start with your electricity bill, available rooftop area, shade-free hours, and long-term energy goals. A good solar plan balances monthly savings with safe structure, reliable equipment, and after-sales support.',
    'Solar Planning',
    'default:hero-commercial',
    '2026-06-05',
    '5 min read',
    1,
    1,
    1
  ),
  (
    'Residential Solar Subsidy Checklist for Homeowners',
    'residential-solar-subsidy-checklist',
    'Know the documents, site details, and practical checks that make the subsidy process smoother.',
    'Keep your electricity bill, consumer number, identity details, bank details, and rooftop photos ready before starting the subsidy process. Eligibility and final subsidy depend on applicable government rules.',
    'Subsidy',
    'default:hero-residential',
    '2026-05-28',
    '4 min read',
    2,
    0,
    1
  ),
  (
    'What Happens During a Professional Solar Site Visit',
    'professional-solar-site-visit',
    'From shadow checks to roof strength, here is what a good solar team reviews before final design.',
    'A site visit checks shade, structure, cable routing, inverter placement, safety access, and expected generation. These checks help avoid surprises during installation.',
    'Process',
    'default:hero-industrial',
    '2026-05-22',
    '3 min read',
    3,
    0,
    1
  )
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  excerpt = VALUES(excerpt),
  content = VALUES(content),
  category = VALUES(category),
  image_url = VALUES(image_url),
  published_at = VALUES(published_at),
  read_time = VALUES(read_time),
  sort_order = VALUES(sort_order),
  is_featured = VALUES(is_featured),
  is_published = VALUES(is_published);
