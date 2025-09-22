// server/index.ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// server/utils/db.ts
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var dbPath = path.join(__dirname, "../../db.json");
var defaultData = {
  users: [],
  history: [],
  breeds: [
    // Gir, Jersey, and other breeds defined here...
    {
      id: "hariana",
      name: "Hariana",
      nameHi: "\u0939\u0930\u093F\u092F\u093E\u0923\u093E",
      averageWeight: "400-500",
      averageHeight: "130-140",
      lifespan: "12-15",
      nativeRegion: "Haryana, India",
      nativeRegionHi: "\u0939\u0930\u093F\u092F\u093E\u0923\u093E, \u092D\u093E\u0930\u0924",
      milkCapacity: "6-10 ",
      milkCapacityHi: "6-10 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "White or light grey color",
        "Medium size, compact body",
        "Good draught and milking ability",
        "Popular in North India"
      ],
      characteristicsHi: [
        "\u0938\u092B\u0947\u0926 \u092F\u093E \u0939\u0932\u094D\u0915\u093E \u0917\u094D\u0930\u0947 \u0930\u0902\u0917",
        "\u092E\u0927\u094D\u092F\u092E \u0906\u0915\u093E\u0930, \u0915\u0949\u092E\u094D\u092A\u0948\u0915\u094D\u091F \u0936\u0930\u0940\u0930",
        "\u0905\u091A\u094D\u091B\u0940 \u092E\u0938\u094C\u0926\u093E \u0914\u0930 \u0926\u0941\u0917\u094D\u0927 \u0915\u094D\u0937\u092E\u0924\u093E",
        "\u0909\u0924\u094D\u0924\u0930 \u092D\u093E\u0930\u0924 \u092E\u0947\u0902 \u0932\u094B\u0915\u092A\u094D\u0930\u093F\u092F"
      ]
    },
    {
      id: "baani",
      name: "Baani",
      nameHi: "\u092C\u093E\u0928\u0940",
      averageWeight: "350-400",
      averageHeight: "120-130",
      lifespan: "10-14",
      nativeRegion: "Punjab, India",
      nativeRegionHi: "\u092A\u0902\u091C\u093E\u092C, \u092D\u093E\u0930\u0924",
      milkCapacity: "5-8 ",
      milkCapacityHi: "5-8 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Small, hardy breed",
        "Adapted to local conditions",
        "Good for draught and milk",
        "Resistant to diseases"
      ],
      characteristicsHi: [
        "\u091B\u094B\u091F\u0940, \u092E\u091C\u092C\u0942\u0924 \u0928\u0938\u094D\u0932",
        "\u0938\u094D\u0925\u093E\u0928\u0940\u092F \u092A\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0941\u0915\u0942\u0932\u093F\u0924",
        "\u092E\u0938\u094C\u0926\u093E \u0914\u0930 \u0926\u0942\u0927 \u0915\u0947 \u0932\u093F\u090F \u0905\u091A\u094D\u091B\u0940",
        "\u0930\u094B\u0917 \u092A\u094D\u0930\u0924\u093F\u0930\u094B\u0927\u0940"
      ]
    },
    {
      id: "khillari",
      name: "Khillari",
      nameHi: "\u0916\u093F\u0932\u094D\u0932\u093E\u0930\u0940",
      averageWeight: "350-500",
      averageHeight: "125-135",
      lifespan: "12-15",
      nativeRegion: "Maharashtra, India",
      nativeRegionHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930, \u092D\u093E\u0930\u0924",
      milkCapacity: "3-6 ",
      milkCapacityHi: "3-6 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Grey or white color",
        "Long, lyre-shaped horns",
        "Excellent draught power",
        "Adapted to dry regions"
      ],
      characteristicsHi: [
        "\u0917\u094D\u0930\u0947 \u092F\u093E \u0938\u092B\u0947\u0926 \u0930\u0902\u0917",
        "\u0932\u0902\u092C\u0947, \u0935\u0940\u0923\u093E \u0915\u0947 \u0906\u0915\u093E\u0930 \u0915\u0947 \u0938\u0940\u0902\u0917",
        "\u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F \u092E\u0938\u094C\u0926\u093E \u0936\u0915\u094D\u0924\u093F",
        "\u0938\u0942\u0916\u0947 \u0915\u094D\u0937\u0947\u0924\u094D\u0930\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0941\u0915\u0942\u0932\u093F\u0924"
      ]
    },
    {
      id: "malnadgidda",
      name: "Malnad Gidda",
      nameHi: "\u092E\u093E\u0932\u0928\u093E\u0921 \u0917\u093F\u0921\u094D\u0921\u093E",
      averageWeight: "150-200",
      averageHeight: "90-100",
      lifespan: "12-15",
      nativeRegion: "Karnataka, India",
      nativeRegionHi: "\u0915\u0930\u094D\u0928\u093E\u091F\u0915, \u092D\u093E\u0930\u0924",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Small, dwarf breed",
        "Brown or black color",
        "High disease resistance",
        "Efficient for small farmers"
      ],
      characteristicsHi: [
        "\u091B\u094B\u091F\u0940, \u092C\u094C\u0928\u0940 \u0928\u0938\u094D\u0932",
        "\u092D\u0942\u0930\u093E \u092F\u093E \u0915\u093E\u0932\u093E \u0930\u0902\u0917",
        "\u0909\u091A\u094D\u091A \u0930\u094B\u0917 \u092A\u094D\u0930\u0924\u093F\u0930\u094B\u0927\u0915 \u0915\u094D\u0937\u092E\u0924\u093E",
        "\u091B\u094B\u091F\u0947 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u0941\u0915\u094D\u0924"
      ]
    },
    {
      id: "jaffrabadi",
      name: "Jaffrabadi",
      nameHi: "\u091C\u093E\u092B\u0930\u093E\u092C\u093E\u0926\u0940",
      averageWeight: "500-600",
      averageHeight: "135-140",
      lifespan: "12-15",
      nativeRegion: "Gujarat, India",
      nativeRegionHi: "\u0917\u0941\u091C\u0930\u093E\u0924, \u092D\u093E\u0930\u0924",
      milkCapacity: "8-14 ",
      milkCapacityHi: "8-14 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Massive body, black color",
        "Heavy, drooping horns",
        "High milk yield",
        "Popular in Saurashtra region"
      ],
      characteristicsHi: [
        "\u0935\u093F\u0936\u093E\u0932 \u0936\u0930\u0940\u0930, \u0915\u093E\u0932\u093E \u0930\u0902\u0917",
        "\u092D\u093E\u0930\u0940, \u091D\u0941\u0915\u0947 \u0939\u0941\u090F \u0938\u0940\u0902\u0917",
        "\u0909\u091A\u094D\u091A \u0926\u0942\u0927 \u0909\u0924\u094D\u092A\u093E\u0926\u0928",
        "\u0938\u094C\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u0915\u094D\u0937\u0947\u0924\u094D\u0930 \u092E\u0947\u0902 \u0932\u094B\u0915\u092A\u094D\u0930\u093F\u092F"
      ]
    },
    {
      id: "alambadi",
      name: "Alambadi",
      nameHi: "\u0906\u0932\u092E\u092C\u093E\u0921\u093C\u0940",
      averageWeight: "350-400",
      averageHeight: "120-130",
      lifespan: "10-14",
      nativeRegion: "Tamil Nadu, India",
      nativeRegionHi: "\u0924\u092E\u093F\u0932\u0928\u093E\u0921\u0941, \u092D\u093E\u0930\u0924",
      milkCapacity: "3-5 ",
      milkCapacityHi: "3-5 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Grey or white color",
        "Medium size, compact body",
        "Good draught ability",
        "Adapted to hilly regions"
      ],
      characteristicsHi: [
        "\u0917\u094D\u0930\u0947 \u092F\u093E \u0938\u092B\u0947\u0926 \u0930\u0902\u0917",
        "\u092E\u0927\u094D\u092F\u092E \u0906\u0915\u093E\u0930, \u0915\u0949\u092E\u094D\u092A\u0948\u0915\u094D\u091F \u0936\u0930\u0940\u0930",
        "\u0905\u091A\u094D\u091B\u0940 \u092E\u0938\u094C\u0926\u093E \u0915\u094D\u0937\u092E\u0924\u093E",
        "\u092A\u0939\u093E\u0921\u093C\u0940 \u0915\u094D\u0937\u0947\u0924\u094D\u0930\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0941\u0915\u0942\u0932\u093F\u0924"
      ]
    },
    {
      id: "deoni",
      name: "Deoni",
      nameHi: "\u0926\u0947\u0935\u0928\u0940",
      averageWeight: "400-500",
      averageHeight: "120-130",
      lifespan: "12-15",
      nativeRegion: "Maharashtra, India",
      nativeRegionHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930, \u092D\u093E\u0930\u0924",
      milkCapacity: "6-10 ",
      milkCapacityHi: "6-10 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "White with black spots",
        "Dual-purpose (milk and draught)",
        "Medium size, strong body",
        "Popular in Marathwada region"
      ],
      characteristicsHi: [
        "\u0938\u092B\u0947\u0926 \u0930\u0902\u0917, \u0915\u093E\u0932\u0947 \u0927\u092C\u094D\u092C\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925",
        "\u0926\u094B\u0939\u0930\u0947 \u0909\u0926\u094D\u0926\u0947\u0936\u094D\u092F (\u0926\u0942\u0927 \u0914\u0930 \u092E\u0938\u094C\u0926\u093E)",
        "\u092E\u0927\u094D\u092F\u092E \u0906\u0915\u093E\u0930, \u092E\u091C\u092C\u0942\u0924 \u0936\u0930\u0940\u0930",
        "\u092E\u0930\u093E\u0920\u0935\u093E\u0921\u093C\u093E \u0915\u094D\u0937\u0947\u0924\u094D\u0930 \u092E\u0947\u0902 \u0932\u094B\u0915\u092A\u094D\u0930\u093F\u092F"
      ]
    },
    {
      id: "bargur",
      name: "Bargur",
      nameHi: "\u092C\u093E\u0930\u0917\u0941\u0930",
      averageWeight: "300-350",
      averageHeight: "110-120",
      lifespan: "10-14",
      nativeRegion: "Tamil Nadu, India",
      nativeRegionHi: "\u0924\u092E\u093F\u0932\u0928\u093E\u0921\u0941, \u092D\u093E\u0930\u0924",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Reddish brown color",
        "Agile and active",
        "Good for hilly terrain",
        "Moderate milk yield"
      ],
      characteristicsHi: [
        "\u0932\u093E\u0932-\u092D\u0942\u0930\u093E \u0930\u0902\u0917",
        "\u092B\u0941\u0930\u094D\u0924\u0940\u0932\u093E \u0914\u0930 \u0938\u0915\u094D\u0930\u093F\u092F",
        "\u092A\u0939\u093E\u0921\u093C\u0940 \u0907\u0932\u093E\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u0941\u0915\u094D\u0924",
        "\u092E\u0927\u094D\u092F\u092E \u0926\u0942\u0927 \u0909\u0924\u094D\u092A\u093E\u0926\u0928"
      ]
    },
    {
      id: "amritmahal",
      name: "Amritmahal",
      nameHi: "\u0905\u092E\u0943\u0924\u092E\u0939\u0932",
      averageWeight: "400-500",
      averageHeight: "130-140",
      lifespan: "12-15",
      nativeRegion: "Karnataka, India",
      nativeRegionHi: "\u0915\u0930\u094D\u0928\u093E\u091F\u0915, \u092D\u093E\u0930\u0924",
      milkCapacity: "3-5 ",
      milkCapacityHi: "3-5 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Grey or white color",
        "Long, sharp horns",
        "Excellent draught power",
        "Adapted to dry regions"
      ],
      characteristicsHi: [
        "\u0917\u094D\u0930\u0947 \u092F\u093E \u0938\u092B\u0947\u0926 \u0930\u0902\u0917",
        "\u0932\u0902\u092C\u0947, \u0928\u0941\u0915\u0940\u0932\u0947 \u0938\u0940\u0902\u0917",
        "\u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F \u092E\u0938\u094C\u0926\u093E \u0936\u0915\u094D\u0924\u093F",
        "\u0938\u0942\u0916\u0947 \u0915\u094D\u0937\u0947\u0924\u094D\u0930\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0941\u0915\u0942\u0932\u093F\u0924"
      ]
    },
    {
      id: "kangayam",
      name: "Kangayam",
      nameHi: "\u0915\u093E\u0902\u0917\u093E\u092F\u092E",
      averageWeight: "350-450",
      averageHeight: "120-130",
      lifespan: "12-15",
      nativeRegion: "Tamil Nadu, India",
      nativeRegionHi: "\u0924\u092E\u093F\u0932\u0928\u093E\u0921\u0941, \u092D\u093E\u0930\u0924",
      milkCapacity: "3-5 ",
      milkCapacityHi: "3-5 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Grey or white color",
        "Compact, muscular body",
        "Good draught ability",
        "Popular in Kongu region"
      ],
      characteristicsHi: [
        "\u0917\u094D\u0930\u0947 \u092F\u093E \u0938\u092B\u0947\u0926 \u0930\u0902\u0917",
        "\u0915\u0949\u092E\u094D\u092A\u0948\u0915\u094D\u091F, \u092E\u093E\u0902\u0938\u0932 \u0936\u0930\u0940\u0930",
        "\u0905\u091A\u094D\u091B\u0940 \u092E\u0938\u094C\u0926\u093E \u0915\u094D\u0937\u092E\u0924\u093E",
        "\u0915\u094B\u0902\u0917\u0941 \u0915\u094D\u0937\u0947\u0924\u094D\u0930 \u092E\u0947\u0902 \u0932\u094B\u0915\u092A\u094D\u0930\u093F\u092F"
      ]
    },
    {
      id: "kasargod",
      name: "Kasargod",
      nameHi: "\u0915\u093E\u0938\u0930\u0917\u094B\u0921",
      averageWeight: "200-250",
      averageHeight: "100-110",
      lifespan: "10-14",
      nativeRegion: "Kerala, India",
      nativeRegionHi: "\u0915\u0947\u0930\u0932, \u092D\u093E\u0930\u0924",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Small, hardy breed",
        "Brown or black color",
        "Adapted to local conditions",
        "Good for small farmers"
      ],
      characteristicsHi: [
        "\u091B\u094B\u091F\u0940, \u092E\u091C\u092C\u0942\u0924 \u0928\u0938\u094D\u0932",
        "\u092D\u0942\u0930\u093E \u092F\u093E \u0915\u093E\u0932\u093E \u0930\u0902\u0917",
        "\u0938\u094D\u0925\u093E\u0928\u0940\u092F \u092A\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0941\u0915\u0942\u0932\u093F\u0924",
        "\u091B\u094B\u091F\u0947 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u0941\u0915\u094D\u0924"
      ]
    },
    {
      id: "nagori",
      name: "Nagori",
      nameHi: "\u0928\u093E\u0917\u094B\u0930\u0940",
      averageWeight: "400-500",
      averageHeight: "130-140",
      lifespan: "12-15",
      nativeRegion: "Rajasthan, India",
      nativeRegionHi: "\u0930\u093E\u091C\u0938\u094D\u0925\u093E\u0928, \u092D\u093E\u0930\u0924",
      milkCapacity: "3-6 ",
      milkCapacityHi: "3-6 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "White or light grey color",
        "Long, upward curving horns",
        "Excellent draught power",
        "Popular in Rajasthan"
      ],
      characteristicsHi: [
        "\u0938\u092B\u0947\u0926 \u092F\u093E \u0939\u0932\u094D\u0915\u093E \u0917\u094D\u0930\u0947 \u0930\u0902\u0917",
        "\u0932\u0902\u092C\u0947, \u090A\u092A\u0930 \u0915\u0940 \u0913\u0930 \u092E\u0941\u0921\u093C\u0947 \u0939\u0941\u090F \u0938\u0940\u0902\u0917",
        "\u0909\u0924\u094D\u0915\u0943\u0937\u094D\u091F \u092E\u0938\u094C\u0926\u093E \u0936\u0915\u094D\u0924\u093F",
        "\u0930\u093E\u091C\u0938\u094D\u0925\u093E\u0928 \u092E\u0947\u0902 \u0932\u094B\u0915\u092A\u094D\u0930\u093F\u092F"
      ]
    },
    {
      id: "nili-ravi",
      name: "Nili Ravi",
      nameHi: "\u0928\u0940\u0932\u0940-\u0930\u093E\u0935\u0940",
      averageWeight: "600-700",
      averageHeight: "125-135",
      lifespan: "15-20",
      nativeRegion: "Punjab region of Pakistan and India",
      nativeRegionHi: "\u092A\u093E\u0915\u093F\u0938\u094D\u0924\u093E\u0928 \u0914\u0930 \u092D\u093E\u0930\u0924 \u0915\u093E \u092A\u0902\u091C\u093E\u092C \u0915\u094D\u0937\u0947\u0924\u094D\u0930",
      milkCapacity: "12-18 ",
      milkCapacityHi: "12-18 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Typically black with white markings (Panj Kalyan)",
        "Small, tightly curled horns",
        "Wall eyes (white eyes)",
        "Docile and gentle temperament"
      ],
      characteristicsHi: [
        "\u0906\u092E\u0924\u094C\u0930 \u092A\u0930 \u0938\u092B\u0947\u0926 \u0928\u093F\u0936\u093E\u0928\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0915\u093E\u0932\u0947 \u0930\u0902\u0917 \u0915\u0940 (\u092A\u0902\u091C \u0915\u0932\u094D\u092F\u093E\u0923)",
        "\u091B\u094B\u091F\u0947, \u0915\u0938\u0915\u0930 \u092E\u0941\u0921\u093C\u0947 \u0939\u0941\u090F \u0938\u0940\u0902\u0917",
        "\u0938\u092B\u0947\u0926 \u0906\u0902\u0916\u0947\u0902",
        "\u0936\u093E\u0902\u0924 \u0914\u0930 \u0935\u093F\u0928\u092E\u094D\u0930 \u0938\u094D\u0935\u092D\u093E\u0935"
      ]
    },
    {
      id: "bhadawari",
      name: "Bhadawari",
      nameHi: "\u092D\u0926\u093E\u0935\u0930\u0940",
      averageWeight: "400-500",
      averageHeight: "125-135",
      lifespan: "12-15",
      nativeRegion: "Uttar Pradesh/Madhya Pradesh, India",
      nativeRegionHi: "\u0909\u0924\u094D\u0924\u0930 \u092A\u094D\u0930\u0926\u0947\u0936/\u092E\u0927\u094D\u092F \u092A\u094D\u0930\u0926\u0947\u0936, \u092D\u093E\u0930\u0924",
      milkCapacity: "6-12 ",
      milkCapacityHi: "6-12 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Copper colored body",
        "Medium size, compact body",
        "High butterfat content in milk",
        "Popular in central India"
      ],
      characteristicsHi: [
        "\u0924\u093E\u0902\u092C\u0947 \u0930\u0902\u0917 \u0915\u093E \u0936\u0930\u0940\u0930",
        "\u092E\u0927\u094D\u092F\u092E \u0906\u0915\u093E\u0930, \u0915\u0949\u092E\u094D\u092A\u0948\u0915\u094D\u091F \u0936\u0930\u0940\u0930",
        "\u0926\u0942\u0927 \u092E\u0947\u0902 \u0909\u091A\u094D\u091A \u092E\u0915\u094D\u0916\u0928 \u0935\u0938\u093E",
        "\u092E\u0927\u094D\u092F \u092D\u093E\u0930\u0924 \u092E\u0947\u0902 \u0932\u094B\u0915\u092A\u094D\u0930\u093F\u092F"
      ]
    },
    {
      id: "dani",
      name: "Dani",
      nameHi: "\u0926\u093E\u0928\u0940",
      averageWeight: "300-350",
      averageHeight: "110-120",
      lifespan: "10-14",
      nativeRegion: "Assam, India",
      nativeRegionHi: "\u0905\u0938\u092E, \u092D\u093E\u0930\u0924",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Small, hardy breed",
        "Brown or black color",
        "Adapted to local conditions",
        "Good for small farmers"
      ],
      characteristicsHi: [
        "\u091B\u094B\u091F\u0940, \u092E\u091C\u092C\u0942\u0924 \u0928\u0938\u094D\u0932",
        "\u092D\u0942\u0930\u093E \u092F\u093E \u0915\u093E\u0932\u093E \u0930\u0902\u0917",
        "\u0938\u094D\u0925\u093E\u0928\u0940\u092F \u092A\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0941\u0915\u0942\u0932\u093F\u0924",
        "\u091B\u094B\u091F\u0947 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u0941\u0915\u094D\u0924"
      ]
    },
    {
      id: "mehsana",
      name: "Mehsana",
      nameHi: "\u092E\u0947\u0939\u0938\u093E\u0923\u093E",
      averageWeight: "450-550",
      averageHeight: "125-135",
      lifespan: "12-15",
      nativeRegion: "Gujarat, India",
      nativeRegionHi: "\u0917\u0941\u091C\u0930\u093E\u0924, \u092D\u093E\u0930\u0924",
      milkCapacity: "8-14 ",
      milkCapacityHi: "8-14 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Black or grey color",
        "Medium size, strong body",
        "High milk yield",
        "Popular in Gujarat"
      ],
      characteristicsHi: [
        "\u0915\u093E\u0932\u093E \u092F\u093E \u0917\u094D\u0930\u0947 \u0930\u0902\u0917",
        "\u092E\u0927\u094D\u092F\u092E \u0906\u0915\u093E\u0930, \u092E\u091C\u092C\u0942\u0924 \u0936\u0930\u0940\u0930",
        "\u0909\u091A\u094D\u091A \u0926\u0942\u0927 \u0909\u0924\u094D\u092A\u093E\u0926\u0928",
        "\u0917\u0941\u091C\u0930\u093E\u0924 \u092E\u0947\u0902 \u0932\u094B\u0915\u092A\u094D\u0930\u093F\u092F"
      ]
    },
    {
      id: "kenkatha",
      name: "Kenkatha",
      nameHi: "\u0915\u0947\u0928\u0915\u0925\u093E",
      averageWeight: "300-350",
      averageHeight: "110-120",
      lifespan: "10-14",
      nativeRegion: "Uttar Pradesh, India",
      nativeRegionHi: "\u0909\u0924\u094D\u0924\u0930 \u092A\u094D\u0930\u0926\u0947\u0936, \u092D\u093E\u0930\u0924",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Small, hardy breed",
        "Brown or black color",
        "Adapted to local conditions",
        "Good for small farmers"
      ],
      characteristicsHi: [
        "\u091B\u094B\u091F\u0940, \u092E\u091C\u092C\u0942\u0924 \u0928\u0938\u094D\u0932",
        "\u092D\u0942\u0930\u093E \u092F\u093E \u0915\u093E\u0932\u093E \u0930\u0902\u0917",
        "\u0938\u094D\u0925\u093E\u0928\u0940\u092F \u092A\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0941\u0915\u0942\u0932\u093F\u0924",
        "\u091B\u094B\u091F\u0947 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u0941\u0915\u094D\u0924"
      ]
    },
    {
      id: "kherigarh",
      name: "Kherigarh",
      nameHi: "\u0916\u0947\u0930\u093F\u0917\u0922\u093C",
      averageWeight: "350-400",
      averageHeight: "120-130",
      lifespan: "10-14",
      nativeRegion: "Uttar Pradesh, India",
      nativeRegionHi: "\u0909\u0924\u094D\u0924\u0930 \u092A\u094D\u0930\u0926\u0947\u0936, \u092D\u093E\u0930\u0924",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Small, hardy breed",
        "Brown or black color",
        "Adapted to local conditions",
        "Good for small farmers"
      ],
      characteristicsHi: [
        "\u091B\u094B\u091F\u0940, \u092E\u091C\u092C\u0942\u0924 \u0928\u0938\u094D\u0932",
        "\u092D\u0942\u0930\u093E \u092F\u093E \u0915\u093E\u0932\u093E \u0930\u0902\u0917",
        "\u0938\u094D\u0925\u093E\u0928\u0940\u092F \u092A\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0941\u0915\u0942\u0932\u093F\u0924",
        "\u091B\u094B\u091F\u0947 \u0915\u093F\u0938\u093E\u0928\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u092F\u0941\u0915\u094D\u0924"
      ]
    },
    {
      id: "gir",
      name: "Gir",
      nameHi: "\u0917\u093F\u0930",
      averageWeight: "400-475",
      averageHeight: "130-140",
      lifespan: "12-15",
      nativeRegion: "Gujarat, India",
      nativeRegionHi: "\u0917\u0941\u091C\u0930\u093E\u0924, \u092D\u093E\u0930\u0924",
      milkCapacity: "10-15 ",
      milkCapacityHi: "10-15 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Distinctive curved horns",
        "Prominent forehead",
        "White with red/brown patches",
        "Heat tolerant",
        "Good maternal instincts"
      ],
      characteristicsHi: [
        "\u0935\u093F\u0936\u093F\u0937\u094D\u091F \u0918\u0941\u092E\u093E\u0935\u0926\u093E\u0930 \u0938\u0940\u0902\u0917",
        "\u092A\u094D\u0930\u092E\u0941\u0916 \u092E\u093E\u0925\u093E",
        "\u0932\u093E\u0932/\u092D\u0942\u0930\u0947 \u0927\u092C\u094D\u092C\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0938\u092B\u0947\u0926",
        "\u0917\u0930\u094D\u092E\u0940 \u0938\u0939\u0928\u0936\u0940\u0932",
        "\u0905\u091A\u094D\u091B\u0940 \u092E\u093E\u0924\u0943 \u092A\u094D\u0930\u0935\u0943\u0924\u094D\u0924\u093F"
      ]
    },
    {
      id: "jersey",
      name: "Jersey",
      nameHi: "\u091C\u0930\u094D\u0938\u0940",
      averageWeight: "400-500",
      averageHeight: "115-120",
      lifespan: "12-15",
      nativeRegion: "Jersey, Channel Islands",
      nativeRegionHi: "\u091C\u0930\u094D\u0938\u0940, \u091A\u0948\u0928\u0932 \u0926\u094D\u0935\u0940\u092A \u0938\u092E\u0942\u0939",
      milkCapacity: "15-25 ",
      milkCapacityHi: "15-25 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Light brown coat with white patches",
        "Small size and fine-boned",
        "High butterfat content in milk",
        "Efficient grazers",
        "Docile temperament"
      ],
      characteristicsHi: [
        "\u0939\u0932\u094D\u0915\u0947 \u092D\u0942\u0930\u0947 \u0930\u0902\u0917 \u0915\u093E \u0915\u094B\u091F \u0914\u0930 \u0938\u092B\u0947\u0926 \u0927\u092C\u094D\u092C\u0947",
        "\u091B\u094B\u091F\u093E \u0906\u0915\u093E\u0930 \u0914\u0930 \u092A\u0924\u0932\u0940 \u0939\u0921\u094D\u0921\u093F\u092F\u093E\u0901",
        "\u0926\u0942\u0927 \u092E\u0947\u0902 \u0909\u091A\u094D\u091A \u092E\u0915\u094D\u0916\u0928 \u0935\u0938\u093E",
        "\u0915\u0941\u0936\u0932 \u091A\u0930\u093E\u0908 \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0940",
        "\u0936\u093E\u0902\u0924 \u0938\u094D\u0935\u092D\u093E\u0935"
      ]
    },
    {
      id: "holstein-friesian",
      name: "Holstein Friesian",
      nameHi: "\u0939\u094B\u0932\u094D\u0938\u094D\u091F\u0940\u0928 \u092B\u094D\u0930\u093F\u0938\u093F\u092F\u0928",
      averageWeight: "680-770",
      averageHeight: "145-165",
      lifespan: "4-6",
      nativeRegion: "Netherlands",
      nativeRegionHi: "\u0928\u0940\u0926\u0930\u0932\u0948\u0902\u0921\u094D\u0938",
      milkCapacity: "25-35 ",
      milkCapacityHi: "25-35 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Large size, black and white markings",
        "Highest milk yield among dairy breeds",
        "Docile temperament",
        "Efficient feed converters"
      ],
      characteristicsHi: [
        "\u092C\u0921\u093C\u093E \u0906\u0915\u093E\u0930, \u0915\u093E\u0932\u0947 \u0914\u0930 \u0938\u092B\u0947\u0926 \u0928\u093F\u0936\u093E\u0928",
        "\u0926\u0941\u0917\u094D\u0927 \u0928\u0938\u094D\u0932\u094B\u0902 \u092E\u0947\u0902 \u0938\u092C\u0938\u0947 \u0905\u0927\u093F\u0915 \u0926\u0942\u0927 \u0909\u0924\u094D\u092A\u093E\u0926\u0928",
        "\u0936\u093E\u0902\u0924 \u0938\u094D\u0935\u092D\u093E\u0935",
        "\u0915\u0941\u0936\u0932 \u091A\u093E\u0930\u093E \u092A\u0930\u093F\u0935\u0930\u094D\u0924\u0915"
      ]
    },
    {
      id: "ayrshire",
      name: "Ayrshire",
      nameHi: "\u0906\u092F\u0930\u0936\u093E\u092F\u0930",
      averageWeight: "540-600",
      averageHeight: "125-135",
      lifespan: "10-12",
      nativeRegion: "Scotland",
      nativeRegionHi: "\u0938\u094D\u0915\u0949\u091F\u0932\u0948\u0902\u0921",
      milkCapacity: "20-30 ",
      milkCapacityHi: "20-30 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Red and white markings",
        "Efficient grazers",
        "Good udder conformation",
        "Hardy and adaptable"
      ],
      characteristicsHi: [
        "\u0932\u093E\u0932 \u0914\u0930 \u0938\u092B\u0947\u0926 \u0928\u093F\u0936\u093E\u0928",
        "\u0915\u0941\u0936\u0932 \u091A\u0930\u093E\u0908 \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0947",
        "\u0905\u091A\u094D\u091B\u0940 \u0925\u0928 \u0930\u091A\u0928\u093E",
        "\u0938\u0939\u0928\u0936\u0940\u0932 \u0914\u0930 \u0905\u0928\u0941\u0915\u0942\u0932\u0928\u0940\u092F"
      ]
    },
    {
      id: "brown-swiss",
      name: "Brown Swiss",
      nameHi: "\u092C\u094D\u0930\u093E\u0909\u0928 \u0938\u094D\u0935\u093F\u0938",
      averageWeight: "590-640",
      averageHeight: "135-145",
      lifespan: "12-15",
      nativeRegion: "Switzerland",
      nativeRegionHi: "\u0938\u094D\u0935\u093F\u091F\u094D\u091C\u093C\u0930\u0932\u0948\u0902\u0921",
      milkCapacity: "22-28 ",
      milkCapacityHi: "22-28 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Light brown to gray-brown coat",
        "Docile and quiet temperament",
        "Strong, well-formed feet and legs",
        "High protein-to-fat ratio in milk"
      ],
      characteristicsHi: [
        "\u0939\u0932\u094D\u0915\u0947 \u092D\u0942\u0930\u0947 \u0938\u0947 \u0917\u094D\u0930\u0947-\u092D\u0942\u0930\u0947 \u0930\u0902\u0917 \u0915\u093E \u0915\u094B\u091F",
        "\u0936\u093E\u0902\u0924 \u0914\u0930 \u0935\u093F\u0928\u092E\u094D\u0930 \u0938\u094D\u0935\u092D\u093E\u0935",
        "\u092E\u091C\u092C\u0942\u0924, \u0905\u091A\u094D\u091B\u0940 \u0924\u0930\u0939 \u0938\u0947 \u0917\u0920\u093F\u0924 \u092A\u0948\u0930",
        "\u0926\u0942\u0927 \u092E\u0947\u0902 \u0909\u091A\u094D\u091A \u092A\u094D\u0930\u094B\u091F\u0940\u0928-\u0938\u0947-\u0935\u0938\u093E \u0905\u0928\u0941\u092A\u093E\u0924"
      ]
    },
    {
      id: "hallikar",
      name: "Hallikar",
      nameHi: "\u0939\u0932\u094D\u0932\u0940\u0915\u0930",
      averageWeight: "350-400",
      averageHeight: "115-125",
      lifespan: "15-20",
      nativeRegion: "Karnataka, India",
      nativeRegionHi: "\u0915\u0930\u094D\u0928\u093E\u091F\u0915, \u092D\u093E\u0930\u0924",
      milkCapacity: "2-4 ",
      milkCapacityHi: "2-4 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Primarily a draught breed",
        "Grey or grayish-black color",
        "Long, slender, curved horns",
        "Known for strength and endurance"
      ],
      characteristicsHi: [
        "\u092E\u0941\u0916\u094D\u092F \u0930\u0942\u092A \u0938\u0947 \u090F\u0915 \u092E\u0938\u094C\u0926\u093E \u0928\u0938\u094D\u0932",
        "\u0917\u094D\u0930\u0947 \u092F\u093E \u0917\u094D\u0930\u0947-\u0915\u093E\u0932\u093E \u0930\u0902\u0917",
        "\u0932\u0902\u092C\u0947, \u092A\u0924\u0932\u0947, \u0918\u0941\u092E\u093E\u0935\u0926\u093E\u0930 \u0938\u0940\u0902\u0917",
        "\u0924\u093E\u0915\u0924 \u0914\u0930 \u0938\u0939\u0928\u0936\u0915\u094D\u0924\u093F \u0915\u0947 \u0932\u093F\u090F \u091C\u093E\u0928\u093E \u091C\u093E\u0924\u093E \u0939\u0948"
      ]
    },
    {
      id: "murrah",
      name: "Murrah",
      nameHi: "\u092E\u0941\u0930\u094D\u0930\u093E",
      averageWeight: "500-700",
      averageHeight: "130-140",
      lifespan: "12-15",
      nativeRegion: "Haryana/Punjab, India",
      nativeRegionHi: "\u0939\u0930\u093F\u092F\u093E\u0923\u093E/\u092A\u0902\u091C\u093E\u092C, \u092D\u093E\u0930\u0924",
      milkCapacity: "8-16 ",
      milkCapacityHi: "8-16 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Jet black color",
        "Short, tightly curved horns",
        "High milk production with high fat content",
        "Docile and gentle temperament"
      ],
      characteristicsHi: [
        "\u091C\u0947\u091F \u0915\u093E\u0932\u093E \u0930\u0902\u0917",
        "\u091B\u094B\u091F\u0947, \u0915\u0938\u0915\u0930 \u092E\u0941\u0921\u093C\u0947 \u0939\u0941\u090F \u0938\u0940\u0902\u0917",
        "\u0909\u091A\u094D\u091A \u0935\u0938\u093E \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0915\u0947 \u0938\u093E\u0925 \u0909\u091A\u094D\u091A \u0926\u0942\u0927 \u0909\u0924\u094D\u092A\u093E\u0926\u0928",
        "\u0936\u093E\u0902\u0924 \u0914\u0930 \u0935\u093F\u0928\u092E\u094D\u0930 \u0938\u094D\u0935\u092D\u093E\u0935"
      ]
    },
    {
      id: "krishna-valley",
      name: "Krishna Valley",
      nameHi: "\u0915\u0943\u0937\u094D\u0923\u093E \u0918\u093E\u091F\u0940",
      averageWeight: "350-450",
      averageHeight: "115-130",
      lifespan: "12-15",
      nativeRegion: "Karnataka, India",
      nativeRegionHi: "\u0915\u0930\u094D\u0928\u093E\u091F\u0915, \u092D\u093E\u0930\u0924",
      milkCapacity: "3-6 ",
      milkCapacityHi: "3-6 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Heavy draft breed",
        "Grey-white color with bulging forehead",
        "Short, curved horns",
        "Fair milkers"
      ],
      characteristicsHi: [
        "\u092D\u093E\u0930\u0940 \u092E\u0938\u094C\u0926\u093E \u0928\u0938\u094D\u0932",
        "\u0909\u092D\u0930\u0947 \u0939\u0941\u090F \u092E\u093E\u0925\u0947 \u0915\u0947 \u0938\u093E\u0925 \u0917\u094D\u0930\u0947-\u0938\u092B\u0947\u0926 \u0930\u0902\u0917",
        "\u091B\u094B\u091F\u0947, \u0918\u0941\u092E\u093E\u0935\u0926\u093E\u0930 \u0938\u0940\u0902\u0917",
        "\u0920\u0940\u0915-\u0920\u093E\u0915 \u0926\u0942\u0927 \u0926\u0947\u0928\u0947 \u0935\u093E\u0932\u0940"
      ]
    },
    {
      id: "nagpuri",
      name: "Nagpuri",
      nameHi: "\u0928\u093E\u0917\u092A\u0941\u0930\u0940",
      averageWeight: "375-525",
      averageHeight: "125-135",
      lifespan: "15-20",
      nativeRegion: "Maharashtra, India",
      nativeRegionHi: "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930, \u092D\u093E\u0930\u0924",
      milkCapacity: "4-8 ",
      milkCapacityHi: "4-8 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Dual-purpose (milk and draught)",
        "Long, flat, curved horns",
        "Well-adapted to harsh, semi-arid conditions",
        "Black color, often with white patches"
      ],
      characteristicsHi: [
        "\u0926\u094B\u0939\u0930\u0947 \u0909\u0926\u094D\u0926\u0947\u0936\u094D\u092F (\u0926\u0942\u0927 \u0914\u0930 \u092E\u0938\u094C\u0926\u093E)",
        "\u0932\u0902\u092C\u0947, \u0938\u092A\u093E\u091F, \u0918\u0941\u092E\u093E\u0935\u0926\u093E\u0930 \u0938\u0940\u0902\u0917",
        "\u0915\u0920\u094B\u0930, \u0905\u0930\u094D\u0927-\u0936\u0941\u0937\u094D\u0915 \u092A\u0930\u093F\u0938\u094D\u0925\u093F\u0924\u093F\u092F\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0905\u091A\u094D\u091B\u0940 \u0924\u0930\u0939 \u0938\u0947 \u0905\u0928\u0941\u0915\u0942\u0932\u093F\u0924",
        "\u0915\u093E\u0932\u093E \u0930\u0902\u0917, \u0905\u0915\u094D\u0938\u0930 \u0938\u092B\u0947\u0926 \u0927\u092C\u094D\u092C\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925"
      ]
    },
    {
      id: "guernsey",
      name: "Guernsey",
      nameHi: "\u0917\u0930\u094D\u0928\u091C\u0940",
      averageWeight: "450-500",
      averageHeight: "125-135",
      lifespan: "10-12",
      nativeRegion: "Isle of Guernsey",
      nativeRegionHi: "\u0917\u0930\u094D\u0928\u091C\u0940 \u0926\u094D\u0935\u0940\u092A",
      milkCapacity: "16-22 ",
      milkCapacityHi: "16-22 \u0932\u0940\u091F\u0930/\u0926\u093F\u0928",
      characteristics: [
        "Golden-yellow milk (high beta-carotene)",
        "Fawn or red-and-white coat",
        "Docile and placid temperament",
        "Efficient converters of feed to milk"
      ],
      characteristicsHi: [
        "\u0938\u0941\u0928\u0939\u0930\u093E-\u092A\u0940\u0932\u093E \u0926\u0942\u0927 (\u0909\u091A\u094D\u091A \u092C\u0940\u091F\u093E-\u0915\u0948\u0930\u094B\u091F\u0940\u0928)",
        "\u0939\u093F\u0930\u0928 \u092F\u093E \u0932\u093E\u0932-\u0914\u0930-\u0938\u092B\u0947\u0926 \u0915\u094B\u091F",
        "\u0936\u093E\u0902\u0924 \u0914\u0930 \u0935\u093F\u0928\u092E\u094D\u0930 \u0938\u094D\u0935\u092D\u093E\u0935",
        "\u091A\u093E\u0930\u0947 \u0915\u094B \u0926\u0942\u0927 \u092E\u0947\u0902 \u092C\u0926\u0932\u0928\u0947 \u092E\u0947\u0902 \u0915\u0941\u0936\u0932"
      ]
    }
  ]
};
var adapter = new JSONFile(dbPath);
var db = new Low(adapter, defaultData);
var breedsCache = null;
var setupDb = async () => {
  await db.read();
  breedsCache = db.data.breeds;
};
var getBreeds = async () => {
  if (!breedsCache) {
    await db.read();
    breedsCache = db.data.breeds;
  }
  return breedsCache;
};
var getHistory = async () => {
  await db.read();
  return db.data.history || [];
};
var addHistoryRecord = async (record) => {
  await db.read();
  db.data.history = db.data.history || [];
  db.data.history.push(record);
  await db.write();
  return record;
};
var removeHistoryRecord = async (recordId) => {
  await db.read();
  db.data.history = db.data.history || [];
  const initialLength = db.data.history.length;
  db.data.history = db.data.history.filter((record) => record.id !== recordId);
  const removed = db.data.history.length < initialLength;
  if (removed) {
    await db.write();
  }
  return removed;
};

// server/routes/predictRoutes.ts
import { Router } from "express";
import multer from "multer";

// server/controllers/predictController.ts
import axios from "axios";
var predict = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }
    if (!process.env.ROBOFLOW_API_KEY) {
      return res.status(500).json({
        message: "Roboflow API key not configured. Please set ROBOFLOW_API_KEY environment variable."
      });
    }
    const imageBase64 = req.file.buffer.toString("base64");
    const response = await axios({
      method: "POST",
      url: `https://detect.roboflow.com/cattel-scan001-xsyt6/1?api_key=${process.env.ROBOFLOW_API_KEY}&name=${req.file.originalname}`,
      data: imageBase64,
      headers: {
        "Content-Type": "text/plain"
      },
      timeout: 3e4
      // 30 second timeout
    });
    if (!response.data || !response.data.predictions || !Array.isArray(response.data.predictions)) {
      return res.status(404).json({ message: "Invalid response from prediction service" });
    }
    const prediction = response.data.predictions[0];
    if (!prediction) {
      return res.status(404).json({ message: "No cattle detected in the image" });
    }
    res.status(200).json({
      breed: prediction.class,
      confidence: prediction.confidence,
      boundingBox: {
        x: prediction.x,
        y: prediction.y,
        width: prediction.width,
        height: prediction.height
      }
    });
  } catch (error) {
    console.error("Prediction error:", error);
    if (error.code === "ECONNABORTED") {
      return res.status(408).json({ message: "Request timeout - please try again" });
    }
    if (error.response) {
      return res.status(error.response.status).json({
        message: "Prediction service error",
        details: error.response.data?.message || "Unknown API error"
      });
    }
    res.status(500).json({
      message: "Server error during prediction",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
    });
  }
};

// server/routes/predictRoutes.ts
var router = Router();
var upload = multer({ storage: multer.memoryStorage() });
router.post("/", upload.single("image"), predict);
var predictRoutes_default = router;

// server/routes/breedRoutes.ts
import { Router as Router2 } from "express";

// server/controllers/breedController.ts
var getBreedInfo = async (req, res) => {
  try {
    const { breedName } = req.params;
    const normalize = (str) => str.toLowerCase().replace(/[-\s]/g, "").trim();
    const breeds = await getBreeds();
    const normBreedName = normalize(breedName);
    const breedInfo = breeds.find((breed) => {
      return normalize(breed.id) === normBreedName || normalize(breed.name) === normBreedName || breed.nameHi && normalize(breed.nameHi) === normBreedName;
    });
    if (!breedInfo) {
      return res.status(404).json({ message: "Breed not found" });
    }
    res.status(200).json(breedInfo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// server/routes/breedRoutes.ts
var router2 = Router2();
router2.get("/:breedName", getBreedInfo);
var breedRoutes_default = router2;

// server/routes/historyRoutes.ts
import { Router as Router3 } from "express";

// server/controllers/historyController.ts
var getHistory2 = async (req, res) => {
  try {
    const history = await getHistory();
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
var createHistoryRecord = async (req, res) => {
  try {
    const { breedId, confidence, earTagId, userId, imageUrl } = req.body;
    if (!breedId || confidence === void 0) {
      return res.status(400).json({ message: "breedId and confidence are required" });
    }
    const newRecord = {
      id: Date.now().toString(),
      // Simple ID generation
      breedId,
      confidence,
      earTagId: earTagId || null,
      userId: userId || null,
      imageUrl: imageUrl || null,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    await addHistoryRecord(newRecord);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Error creating history record:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
var deleteHistoryRecord = async (req, res) => {
  try {
    const { recordId } = req.params;
    if (!recordId) {
      return res.status(400).json({ message: "recordId is required" });
    }
    const success = await removeHistoryRecord(recordId);
    if (!success) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting history record:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// server/routes/historyRoutes.ts
var router3 = Router3();
router3.get("/", getHistory2);
router3.post("/", createHistoryRecord);
router3.delete("/:recordId", deleteHistoryRecord);
var historyRoutes_default = router3;

// server/index.ts
dotenv.config();
var app = express();
var port = process.env.PORT || 3001;
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? ["https://ogarsh.tech", "https://cattle.ai"] : true,
  credentials: true
}));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/predict", predictRoutes_default);
app.use("/api/breed", breedRoutes_default);
app.use("/api/history", historyRoutes_default);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    version: "1.0.0"
  });
});
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});
app.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});
var startServer = async () => {
  try {
    await setupDb();
    app.listen(port, () => {
      console.log(`\u{1F404} Cattle.AI server running on port ${port}`);
      console.log(`\u{1F4CA} Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("\u274C Failed to start server:", error);
    process.exit(1);
  }
};
startServer();
