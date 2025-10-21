import React from "react";
import { Star, Globe, Zap } from "lucide-react";

export const allProducts = [
  {
    icon: <Star className="w-5 h-5" />,
    title: "Software Pixelas Studio",
    subtitle: "International Payment",
    description: "Professional AI-powered image editing software with advanced features for creative professionals worldwide.",
    price: "$12.99",
    featured: true,
    link: "https://lynk.id/pixelas.cloud/mq7on743wrqq",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
    category: "Standalone Apps",
    detailedDescription: "Pixelas Studio is a comprehensive AI-powered image editing solution designed for professional photographers, graphic designers, and digital artists. Features include advanced AI retouching, batch processing, non-destructive editing, and seamless integration with popular workflows. Perfect for both beginners and professionals.",
    features: ["AI-Powered Retouching", "Batch Processing", "Non-Destructive Editing", "Cloud Sync", "Plugin Support"],
    detailedImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop"
  },
  // ... rest of the products
];

export const categories = ["All", "Standalone Apps", "Photoshop Plugins", "AI Tools"];
