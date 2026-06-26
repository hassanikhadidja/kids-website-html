window.GIFT_GUIDE_TAG_COLORS = {
  Birthday: 'purple',
  Christmas: 'red',
  Toddler: 'green',
  Kids: 'blue',
  Teens: 'orange',
  Bob: 'green',
  LEGO: 'purple',
  Budget: 'blue',
  STEM: 'orange',
  Outdoor: 'green',
  Baby: 'purple',
  Family: 'red'
};

window.GIFT_GUIDES = [
  {
    slug: 'best-gifts-for-toddlers',
    title: 'Best Gifts for Toddlers',
    description: 'Soft plush, chunky blocks, and sensory toys that little hands love to explore.',
    tags: ['Toddler', 'Baby'],
    placeholder: 'Colorful toddler toys and plush on display'
  },
  {
    slug: 'bobs-world-gift-picks',
    title: "Bob's World Gift Picks",
    description: 'Bring Bob home with plush bears, activity books, and adventure sets from La Boutique de Bob.',
    tags: ['Bob', 'Kids'],
    placeholder: 'Bob plush bear with top hat and gift box'
  },
  {
    slug: 'lego-sets-under-30',
    title: 'LEGO Sets Under $30',
    description: 'Creative building sets that spark imagination without breaking the budget.',
    tags: ['LEGO', 'Budget', 'Kids'],
    placeholder: 'LEGO brick sets wrapped with ribbons'
  },
  {
    slug: 'christmas-morning-must-haves',
    title: 'Christmas Morning Must-Haves',
    description: 'Festive favorites to unwrap on the big day — from classics to new surprises.',
    tags: ['Christmas', 'Family'],
    placeholder: 'Wrapped presents under a decorated tree'
  },
  {
    slug: 'birthday-gifts-for-5-year-olds',
    title: 'Birthday Gifts for 5-Year-Olds',
    description: 'Fun picks for active play, pretend adventures, and growing imaginations.',
    tags: ['Birthday', 'Kids'],
    placeholder: 'Birthday gifts with balloons and party hats'
  },
  {
    slug: 'stem-gift-guide',
    title: 'STEM Gift Guide',
    description: 'Science kits, coding toys, and brain-building sets for curious young minds.',
    tags: ['STEM', 'Kids', 'Teens'],
    placeholder: 'Science experiment kit and robotics toy'
  },
  {
    slug: 'outdoor-adventure-gifts',
    title: 'Outdoor Adventure Gifts',
    description: 'Bikes, sports gear, and backyard playsets for sunny-day fun.',
    tags: ['Outdoor', 'Kids', 'Family'],
    placeholder: 'Outdoor toys including bike and sports ball'
  },
  {
    slug: 'teen-gamer-gift-ideas',
    title: 'Teen Gamer Gift Ideas',
    description: 'Controllers, collectibles, and games that level up any setup.',
    tags: ['Teens'],
    placeholder: 'Gaming accessories and collectible figures'
  },
  {
    slug: 'babys-first-toys',
    title: "Baby's First Toys",
    description: 'Rattles, soft books, and gentle playthings for the newest family member.',
    tags: ['Baby', 'Toddler'],
    placeholder: 'Soft baby toys and rattles in pastel colors'
  },
  {
    slug: 'stocking-stuffers',
    title: 'Stocking Stuffers',
    description: 'Small surprises that fit perfectly — cards, mini figures, and pocket-sized fun.',
    tags: ['Christmas', 'Budget'],
    placeholder: 'Small toys spilling out of a holiday stocking'
  },
  {
    slug: 'family-game-night',
    title: 'Family Game Night Picks',
    description: 'Board games and party games everyone from kids to grown-ups can enjoy together.',
    tags: ['Family', 'Kids'],
    placeholder: 'Board games stacked on a family table'
  },
  {
    slug: 'budget-friendly-finds',
    title: 'Budget-Friendly Finds',
    description: 'Thoughtful gifts under $25 that still deliver big smiles.',
    tags: ['Budget', 'Kids'],
    placeholder: 'Affordable toy gifts with price tags'
  }
];

window.getGiftGuideUrl = function (guide) {
  if (guide.href) return guide.href;
  return 'toysrus-gift-guide-article.html?slug=' + encodeURIComponent(guide.slug);
};

window.findGiftGuideBySlug = function (slug) {
  return window.GIFT_GUIDES.find(function (guide) {
    return guide.slug === slug;
  }) || null;
};
