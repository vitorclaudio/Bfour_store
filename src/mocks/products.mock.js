const productsMock = [
    {
        _id: "dress-001",
        title: "Azure Elegance Evening Gown",
        department: "Evening Gowns",
        price: 249.99,
        imagePath: `${process.env.PUBLIC_URL}/images/mock/VestidoAzul.jpg`,
        description: "Long evening gown in a soft blue tone, featuring a fitted silhouette with a subtle flared hem. Designed with a sophisticated cape overlay, elegant front neckline cut and refined textured fabric, perfect for formal events and special occasions.",
        features: [
            "Long evening gown",
            "Soft blue tone",
            "Elegant cape overlay",
            "Fitted silhouette with flared hem",
            "Textured premium fabric",
            "Ideal for formal events and galas"
        ]
    },
    {
        _id: "dress-002",
        title: "Champagne Glow Evening Dress",
        department: "Cocktail Dresses",
        price: 179.99,
        imagePath: `${process.env.PUBLIC_URL}/images/mock/VestidoBranco.jpg`,
        description: "Long evening dress in a refined champagne tone, featuring a fitted silhouette with delicate long sleeves and intricate embroidered detailing. The softly shimmering fabric enhances its elegance, making it ideal for formal events, weddings, and evening receptions.",
        features: [
            "Long evening dress",
            "Champagne / nude rosé tone",
            "Delicate embroidered detailing",
            "Subtle shimmering finish",
            "Long sleeves with refined transparency",
            "Fitted silhouette",
            "Ideal for weddings and formal events"
        ]
    },
    {
        _id: "dress-003",
        title: "Golden Amber Couture Gown",
        department: "Special Occasions",
        price: 199.99,
        imagePath: `${process.env.PUBLIC_URL}/images/mock/vestidoMarrom.jpg`,
        description: "Strapless couture gown featuring a structured, embellished bodice in a golden tone paired with a flowing tulle skirt in warm amber hues. The design highlights a sculpted silhouette with a dramatic, airy finish, ideal for formal evenings, galas, and special occasions.",
        features: [
            "Strapless evening gown",
            "Golden amber / honey gold tones",
            "Structured embellished bodice",
            "Flowing tulle skirt with soft volume",
            "Elegant couture silhouette",
            "Lightweight and airy finish",
            "Ideal for galas and formal events"
        ]
    }

];

export default productsMock;
