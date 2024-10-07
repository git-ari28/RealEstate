const ListData = [
    {
      id: 1,
      title: "Luxury Villa",
      img: "https://example.com/img1.jpg",
      bedrooms: 4,
      bathrooms: 3,
      price: 500000,
      address: "123 Palm Drive, Los Angeles, CA",
      latitude: 34.0522,
      longitude: -118.2437
    },
    {
      id: 2,
      title: "Modern Apartment",
      img: "https://example.com/img2.jpg",
      bedrooms: 2,
      bathrooms: 2,
      price: 300000,
      address: "456 Sunset Blvd, San Francisco, CA",
      latitude: 37.7749,
      longitude: -122.4194
    },
    {
      id: 3,
      title: "Cozy Cottage",
      img: "https://example.com/img3.jpg",
      bedrooms: 3,
      bathrooms: 2,
      price: 200000,
      address: "789 Oak Street, Portland, OR",
      latitude: 45.5152,
      longitude: -122.6784
    },
    {
      id: 4,
      title: "Beach House",
      img: "https://example.com/img4.jpg",
      bedrooms: 5,
      bathrooms: 4,
      price: 750000,
      address: "321 Ocean Ave, Miami, FL",
      latitude: 25.7617,
      longitude: -80.1918
    },
    {
      id: 5,
      title: "Urban Loft",
      img: "https://example.com/img5.jpg",
      bedrooms: 1,
      bathrooms: 1,
      price: 250000,
      address: "654 Main St, Seattle, WA",
      latitude: 47.6062,
      longitude: -122.3321
    },
    {
      id: 6,
      title: "Suburban Home",
      img: "https://example.com/img6.jpg",
      bedrooms: 4,
      bathrooms: 3,
      price: 450000,
      address: "987 Elm Ave, Dallas, TX",
      latitude: 32.7767,
      longitude: -96.7970
    },
    {
      id: 7,
      title: "Penthouse Apartment",
      img: "https://example.com/img7.jpg",
      bedrooms: 3,
      bathrooms: 2,
      price: 850000,
      address: "345 Skyline Dr, New York, NY",
      latitude: 40.7128,
      longitude: -74.0060
    },
    {
      id: 8,
      title: "Lakefront Cabin",
      img: "https://example.com/img8.jpg",
      bedrooms: 3,
      bathrooms: 2,
      price: 400000,
      address: "123 Lakeview Rd, Tahoe, NV",
      latitude: 39.0968,
      longitude: -120.0324
    },
    {
      id: 9,
      title: "Downtown Condo",
      img: "https://example.com/img9.jpg",
      bedrooms: 2,
      bathrooms: 2,
      price: 375000,
      address: "456 City Square, Chicago, IL",
      latitude: 41.8781,
      longitude: -87.6298
    },
    {
      id: 10,
      title: "Country Farmhouse",
      img: "https://example.com/img10.jpg",
      bedrooms: 4,
      bathrooms: 3,
      price: 550000,
      address: "789 Country Ln, Austin, TX",
      latitude: 30.2672,
      longitude: -97.7431
    },
    // Additional 40 objects with different details
    {
      id: 11,
      title: "Mountain Retreat",
      img: "https://example.com/img11.jpg",
      bedrooms: 5,
      bathrooms: 4,
      price: 800000,
      address: "321 Mountain Rd, Denver, CO",
      latitude: 39.7392,
      longitude: -104.9903
    },
    {
      id: 12,
      title: "Victorian Mansion",
      img: "https://example.com/img12.jpg",
      bedrooms: 6,
      bathrooms: 5,
      price: 950000,
      address: "654 King St, Boston, MA",
      latitude: 42.3601,
      longitude: -71.0589
    },
    {
      id: 13,
      title: "City Studio",
      img: "https://example.com/img13.jpg",
      bedrooms: 1,
      bathrooms: 1,
      price: 200000,
      address: "987 Broadway, Las Vegas, NV",
      latitude: 36.1699,
      longitude: -115.1398
    },
    {
      id: 14,
      title: "Seaside Bungalow",
      img: "https://example.com/img14.jpg",
      bedrooms: 3,
      bathrooms: 2,
      price: 500000,
      address: "123 Coastline Blvd, San Diego, CA",
      latitude: 32.7157,
      longitude: -117.1611
    },
    {
      id: 15,
      title: "Modern Townhouse",
      img: "https://example.com/img15.jpg",
      bedrooms: 2,
      bathrooms: 2,
      price: 350000,
      address: "456 River Rd, Atlanta, GA",
      latitude: 33.7490,
      longitude: -84.3880
    },
    {
      id: 16,
      title: "Luxury Penthouse",
      img: "https://example.com/img16.jpg",
      bedrooms: 3,
      bathrooms: 3,
      price: 1200000,
      address: "789 Central Park Ave, New York, NY",
      latitude: 40.785091,
      longitude: -73.968285
    },
    {
      id: 17,
      title: "Country Estate",
      img: "https://example.com/img17.jpg",
      bedrooms: 7,
      bathrooms: 6,
      price: 1500000,
      address: "321 Heritage Dr, Nashville, TN",
      latitude: 36.1627,
      longitude: -86.7816
    },
    {
      id: 18,
      title: "Ranch House",
      img: "https://example.com/img18.jpg",
      bedrooms: 4,
      bathrooms: 3,
      price: 450000,
      address: "654 Prairie Rd, Phoenix, AZ",
      latitude: 33.4484,
      longitude: -112.0740
    },
    {
      id: 19,
      title: "Modern Loft",
      img: "https://example.com/img19.jpg",
      bedrooms: 2,
      bathrooms: 2,
      price: 420000,
      address: "987 Highline St, Austin, TX",
      latitude: 30.2672,
      longitude: -97.7431
    },
    {
      id: 20,
      title: "Suburban Cottage",
      img: "https://example.com/img20.jpg",
      bedrooms: 3,
      bathrooms: 2,
      price: 320000,
      address: "123 Maple Ln, Charlotte, NC",
      latitude: 35.2271,
      longitude: -80.8431
    },
    {
      id: 21,
      title: "Spacious Villa",
      img: "https://example.com/img21.jpg",
      bedrooms: 5,
      bathrooms: 4,
      price: 980000,
      address: "789 Beachside Dr, Malibu, CA",
      latitude: 34.0259,
      longitude: -118.7798
    },
    {
      id: 22,
      title: "Urban Penthouse",
      img: "https://example.com/img22.jpg",
      bedrooms: 3,
      bathrooms: 3,
      price: 1050000,
      address: "123 Market St, San Francisco, CA",
      latitude: 37.7749,
      longitude: -122.4194
    },
    {
      id: 23,
      title: "Modern Duplex",
      img: "https://example.com/img23.jpg",
      bedrooms: 4,
      bathrooms: 3,
      price: 450000,
      address: "321 Westside Dr, Los Angeles, CA",
      latitude: 34.0522,
      longitude: -118.2437
    },
    // Additional objects continue until id: 50
  ];
  