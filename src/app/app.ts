import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AboutCardComponent,
  AboutCard1Component,
  AnimatedCardComponent,
  AnimatedCard1Component,
  BannerCardComponent,
  BannerCard1Component,
  BlogCardComponent,
  CategoryCardComponent,
  ContactCardComponent,
  GridComponent,
  HeroSectionComponent,
  NormalCardComponent,
  NormalCardCircleComponent,
  PreHeaderComponent,
  QuickAccessComponent,
  ReviewCardComponent,
  ServiceCardComponent,
  ServiceCard2Component,
  ServiceCard3Component,
  ServiceCard4Component,
  ServiceCard5Component,
  ItemCardComponent,
  ItemZoomCardComponent,
  TestimonialCardComponent
} from 'jaldee-widgets';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PreHeaderComponent,
    QuickAccessComponent,
    HeroSectionComponent,
    GridComponent,
    AboutCardComponent,
    AboutCard1Component,
    BannerCardComponent,
    BannerCard1Component,
    ContactCardComponent,
    NormalCardComponent,
    NormalCardCircleComponent,
    ReviewCardComponent,
    ServiceCardComponent,
    ServiceCard2Component,
    ServiceCard3Component,
    ServiceCard4Component,
    ServiceCard5Component,
    BlogCardComponent,
    CategoryCardComponent,
    AnimatedCardComponent,
    AnimatedCard1Component,
    ItemCardComponent,
    ItemZoomCardComponent,
    TestimonialCardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  cardTypeImages: Record<string, string> = {
    'normal-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/normal-card.png',
    'normal-card-circle': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/circle-card.png',
    'animated-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/normal-card.png',
    'animated-card1': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/normal-card.png',
    'service-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/service-card.png',
    'service-card2': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/service-card2.png',
    'service-card3': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/service-card3.png',
    'service-card4': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/service-card4.png',
    'location-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/location-card.png',
    'booking-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/booking-card.png',
    'department-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/department-card.png',
    'profile-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/profile-card.png',
    'banner-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/banner-card.png',
    'banner-card1': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/banner-card1.png',
    'about-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/about-card.png',
    'about-card1': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/about-card1.png',
    'item-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/item-card.png',
    'item-zoom-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/item-zoom-card.png',
    'review-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/review-card.png',
    'contact-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/contact-card.png',
    'category-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/normal-card.png',
    'blog-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/normal-card.png',
    'testimonial-card': 'https://jaldeeuiscale.s3.ap-south-1.amazonaws.com/JALDEE/images/card-types/review-card.png'
  };

  missingCardTypes = [
    { name: 'location-card', image: this.cardTypeImages['location-card'] },
    { name: 'booking-card', image: this.cardTypeImages['booking-card'] },
    { name: 'department-card', image: this.cardTypeImages['department-card'] },
    { name: 'profile-card', image: this.cardTypeImages['profile-card'] }
  ];

  demoHeader = {
    announcements: [
      {
        message: 'Free delivery on orders above $50',
        foregroundColor: '#ffffff',
        backgroundColor: '#1f2937',
        fontSize: 14
      },
      {
        message: 'New arrivals are live - shop now',
        foregroundColor: '#ffffff',
        backgroundColor: '#7c3aed',
        fontSize: 14
      }
    ]
  };

  quickAccess = {
    id: 'quick-access',
    content: [
      {
        title: 'Chat with us',
        image: 'https://placehold.co/56x56?text=WA',
        link: 'https://wa.me/1234567890',
        styles: {
          backgroundColor: '#25d366',
          padding: '8px',
          borderRadius: '999px'
        }
      }
    ]
  };

  heroSection = {
    id: 'hero',
    title: '',
    cardType: 'banner-card',
    content: [
      {
        title: 'The Great Indian Wedding',
        subTitle: 'Sale',
        description: 'Its the season of sarees and savings!',
        buttonCaption: 'Shop now',
        image: this.cardTypeImages['banner-card'],
        image_aspectRatio: '5/2',
        foregroundColor: '#ffffff',
        backgroundColor: 'rgba(90, 26, 26, 0.65)'
      }
    ]
  };

  sliderSection = {
    id: 'slider',
    title: 'Featured Services',
    subTitle: 'Most booked this week',
    contentType: 'static',
    cardType: 'service-card',
    showMore: true,
    moreCaption: 'View all',
    moreLink: 'services',
    content: [
      {
        title: 'Therapy Session',
        subTitle: '45 min',
        description: 'Guided session with a specialist',
        image: 'https://placehold.co/360x240?text=Therapy',
        buttonCaption: 'Book now'
      },
      {
        title: 'Wellness Check',
        subTitle: '30 min',
        description: 'Routine wellness screening',
        image: 'https://placehold.co/360x240?text=Wellness',
        buttonCaption: 'Book now'
      },
      {
        title: 'Consultation',
        subTitle: '20 min',
        description: 'Quick consult with a coach',
        image: 'https://placehold.co/360x240?text=Consult',
        buttonCaption: 'Book now'
      }
    ]
  };

  gridSection = {
    id: 'grid',
    className: 'cardLayout',
    title: 'Categories',
    subTitle: 'Curated collections crafted for comfort, tradition, and family moments.',
    contentType: 'static',
    cols_xs_options: { items: 2 },
    cols_md_options: { items: 3 },
    cols_xl_options: { items: 4 },
    content: [
      {
        title: 'Pure Linen',
        image: 'https://placehold.co/300x420?text=Pure+Linen'
      },
      {
        title: 'Handloom Cotton',
        image: 'https://placehold.co/300x420?text=Handloom+Cotton'
      },
      {
        title: 'Handloom Linen',
        image: 'https://placehold.co/300x420?text=Handloom+Linen'
      },
      {
        title: 'Kanjivaram Sarees',
        image: 'https://placehold.co/300x420?text=Kanjivaram+Sarees'
      },
      {
        title: 'Tussar Silk',
        image: 'https://placehold.co/300x420?text=Tussar+Silk'
      },
      {
        title: 'Pench Saree',
        image: 'https://placehold.co/300x420?text=Pench+Saree'
      },
      {
        title: 'Durga Pooja',
        image: 'https://placehold.co/300x420?text=Durga+Pooja'
      },
      {
        title: 'Satin Georgette',
        image: 'https://placehold.co/300x420?text=Satin+Georgette'
      }
    ]
  };

  testimonialsSection = {
    id: 'testimonials',
    title: 'Loved by clients',
    subtitle: 'Real stories from the community',
    content: [
      {
        title: 'A calm reset',
        description: 'The team made everything feel seamless and welcoming.',
        image: 'https://placehold.co/96x96?text=A'
      },
      {
        title: 'Exactly what I needed',
        description: 'Clear guidance and a thoughtful plan.',
        image: 'https://placehold.co/96x96?text=B'
      },
      {
        title: 'Five-star support',
        description: 'Helpful follow-up every time.',
        image: 'https://placehold.co/96x96?text=C'
      }
    ]
  };

  testimonials2Section = {
    id: 'testimonials2',
    title: 'Reviews',
    subtitle: 'What people say',
    content: [
      {
        title: 'Loved the service',
        description: 'Quick and easy process.',
        date: 'Jan 2026'
      },
      {
        title: 'Highly recommend',
        description: 'The team was fantastic.',
        date: 'Dec 2025'
      },
      {
        title: 'Great experience',
        description: 'Smooth booking and friendly staff.',
        date: 'Nov 2025'
      }
    ]
  };

  marqueeSection = {
    id: 'marquee',
    content: [
      { title: 'Premium fabrics' },
      { title: 'Personal styling' },
      { title: 'Same-day delivery' }
    ]
  };

  imageWithContents = {
    title: 'Why Clients Choose Us',
    image: 'https://placehold.co/520x420?text=Studio+View',
    content: [
      {
        title: 'Curated spaces',
        description: 'Designed for calm, focus, and privacy.',
        image: 'https://placehold.co/40x40?text=1'
      },
      {
        title: 'Expert staff',
        description: 'Certified professionals ready to help.',
        image: 'https://placehold.co/40x40?text=2'
      }
    ]
  };

  bannerWithContent = {
    title: 'Behind the Scenes',
    content: [
      {
        description: '<strong>Meet the care team</strong> and tour the studio.',
        video: 'https://www.w3schools.com/html/mov_bbb.mp4'
      }
    ]
  };

  blogSection = {
    id: 'blogs',
    title: 'Latest Articles',
    subTitle: 'Tips and stories from the team',
    content: [
      {
        id: '1',
        title: 'Mindful routines',
        content: 'Simple habits to stay grounded every day.',
        image: 'https://placehold.co/420x260?text=Blog+1'
      },
      {
        id: '2',
        title: 'Wellness at home',
        content: 'Make your space feel like a retreat.',
        image: 'https://placehold.co/420x260?text=Blog+2'
      }
    ]
  };

  cardSamples = {
    banner: {
      title: 'Premium Collection',
      subTitle: 'Limited edition',
      description: 'A curated selection of seasonal fabrics.',
      image: this.cardTypeImages['banner-card'],
      foregroundColor: '#ffffff',
      backgroundColor: 'rgba(50, 20, 20, 0.7)',
      buttonCaption: 'Explore'
    },
    banner1: {
      title: 'The Great Indian Wedding',
      subTitle: 'Sale',
      description: 'Flat 25% off',
      image: this.cardTypeImages['banner-card1'],
      foregroundColor: '#ffffff',
      backgroundColor: '#6b2b2b',
      buttonCaption: 'Shop now'
    },
    normal: {
      title: 'Signature Edit',
      image: this.cardTypeImages['normal-card'],
      foregroundColor: '#111111',
      backgroundColor: '#ffffff'
    },
    normalCircle: {
      title: 'Circle Edit',
      image: this.cardTypeImages['normal-card-circle'],
      foregroundColor: '#111111',
      backgroundColor: '#ffffff'
    },
    animated: {
      title: 'Consultation',
      subTitle: '30 min',
      image: this.cardTypeImages['animated-card'],
      foregroundColor: '#111111',
      backgroundColor: '#f8f6f2'
    },
    animated1: {
      title: 'Consultation',
      subTitle: '30 min',
      image: this.cardTypeImages['animated-card1'],
      foregroundColor: '#111111',
      backgroundColor: '#f8f6f2'
    },
    service: {
      title: 'Consultation',
      subTitle: '30 min',
      description: 'One-on-one session with an expert.',
      image: this.cardTypeImages['service-card'],
      buttonCaption: 'Book now',
      foregroundColor: '#1f2937',
      backgroundColor: '#ffffff'
    },
    service2: {
      title: 'Consultation',
      subTitle: '30 min',
      description: 'One-on-one session with an expert.',
      image: this.cardTypeImages['service-card2'],
      buttonCaption: 'Book now',
      foregroundColor: '#1f2937',
      backgroundColor: '#ffffff'
    },
    service3: {
      title: 'Consultation',
      subTitle: '30 min',
      description: 'One-on-one session with an expert.',
      image: this.cardTypeImages['service-card3'],
      buttonCaption: 'Book now',
      foregroundColor: '#1f2937',
      backgroundColor: '#ffffff'
    },
    service4: {
      title: 'Consultation',
      subTitle: '30 min',
      description: 'One-on-one session with an expert.',
      image: this.cardTypeImages['service-card4'],
      buttonCaption: 'Book now',
      foregroundColor: '#1f2937',
      backgroundColor: '#ffffff'
    },
    service5: {
      title: 'Consultation',
      subTitle: '30 min',
      description: 'One-on-one session with an expert.',
      image: this.cardTypeImages['service-card4'],
      buttonCaption: 'Book now',
      foregroundColor: '#1f2937',
      backgroundColor: '#ffffff'
    },
    review: {
      title: 'Wonderful support',
      subTitle: 'Client review',
      description: 'Everything was handled professionally.',
      image: this.cardTypeImages['review-card']
    },
    item: {
      title: 'Signature Set',
      subTitle: 'New',
      image: this.cardTypeImages['item-card'],
      buttonCaption: 'View item',
      price: '1800',
      mrp: '2400',
      foregroundColor: '#ffffff',
      backgroundColor: '#436b50'
    },
    itemZoom: {
      title: 'Item Zoom',
      image: this.cardTypeImages['item-zoom-card']
    },
    about: {
      title: 'About the collection',
      subTitle: 'Heritage weaves',
      description: 'Curated for festive moments and timeless traditions.',
      image: this.cardTypeImages['about-card'],
      imageAlignment: 'left',
      foregroundColor: '#2f2a25',
      backgroundColor: '#f7f3ea',
      buttonCaption: 'Explore'
    },
    about1: {
      title: 'Crafted for celebrations',
      subTitle: 'Heritage series',
      description: 'A story of weave, tradition, and artistry.',
      image: this.cardTypeImages['about-card1'],
      foregroundColor: '#2f2a25',
      backgroundColor: '#f7f3ea',
      buttonCaption: 'Discover'
    },
    contact: {
      title: 'Need help?',
      subTitle: 'Talk to us',
      description: 'Chat with the team for styling help.',
      image: this.cardTypeImages['contact-card'],
      imageAlignment: 'left',
      foregroundColor: '#1f2937',
      backgroundColor: '#f3f1ec',
      buttonCaption: 'Message',
      buttonHover: true,
      link: '#'
    },
    category: {
      title: 'Category',
      image: this.cardTypeImages['category-card']
    },
    blog: {
      title: 'Blog',
      image: this.cardTypeImages['blog-card']
    },
    testimonial: {
      title: 'Testimonial',
      image: this.cardTypeImages['testimonial-card']
    }
  };

  handleAction(event: any) {
    console.log('Widget action:', event);
  }
}
