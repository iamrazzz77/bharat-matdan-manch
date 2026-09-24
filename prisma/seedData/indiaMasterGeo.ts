export interface SeedBooth {
  boothNumber: number;
}

export interface SeedPollingStation {
  stationCode: string;
  name: string;
  nameHi: string;
  address: string;
  booths: SeedBooth[];
}

export interface SeedConstituency {
  code: string;
  name: string;
  nameHi: string;
  type: "PARLIAMENTARY" | "ASSEMBLY";
  totalVoters: number;
  pollingStations: SeedPollingStation[];
}

export interface SeedDistrict {
  name: string;
  nameHi: string;
  constituencies: SeedConstituency[];
}

export interface SeedState {
  code: string;
  name: string;
  nameHi: string;
  type: "STATE" | "UNION_TERRITORY";
  totalSeats: number;
  districts: SeedDistrict[];
}

export const INDIA_MASTER_GEO: SeedState[] = [
  // 1. ANDHRA PRADESH
  {
    code: "AP",
    name: "Andhra Pradesh",
    nameHi: "आंध्र प्रदेश",
    type: "STATE",
    totalSeats: 25,
    districts: [
      {
        name: "Visakhapatnam",
        nameHi: "विशाखापट्टनम",
        constituencies: [
          {
            code: "PC01-AP",
            name: "Visakhapatnam",
            nameHi: "विशाखापट्टनम",
            type: "PARLIAMENTARY",
            totalVoters: 1820000,
            pollingStations: [
              {
                stationCode: "ST-AP-01",
                name: "AU High School, Siripuram",
                nameHi: "एयू हाई स्कूल, सिरिपुरम",
                address: "Siripuram, Visakhapatnam, Andhra Pradesh 530003",
                booths: [{ boothNumber: 1 }, { boothNumber: 2 }]
              }
            ]
          }
        ]
      },
      {
        name: "NTR District (Vijayawada)",
        nameHi: "एनटीआर जिला (विजयवाडा)",
        constituencies: [
          {
            code: "PC02-AP",
            name: "Vijayawada",
            nameHi: "विजयवाडा",
            type: "PARLIAMENTARY",
            totalVoters: 1690000,
            pollingStations: [
              {
                stationCode: "ST-AP-02",
                name: "SRR & CVR Govt Degree College",
                nameHi: "एसआरआर एंड सीवीआर डिग्री कॉलेज",
                address: "Machavaram, Vijayawada 520004",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 2. ARUNACHAL PRADESH
  {
    code: "AR",
    name: "Arunachal Pradesh",
    nameHi: "अरुणाचल प्रदेश",
    type: "STATE",
    totalSeats: 2,
    districts: [
      {
        name: "Papum Pare",
        nameHi: "पापुम बारे",
        constituencies: [
          {
            code: "PC01-AR",
            name: "Arunachal West",
            nameHi: "अरुणाचल पश्चिम",
            type: "PARLIAMENTARY",
            totalVoters: 480000,
            pollingStations: [
              {
                stationCode: "ST-AR-01",
                name: "Govt Higher Secondary School, Itanagar",
                nameHi: "सरकारी उच्चतर माध्यमिक विद्यालय, ईटानगर",
                address: "Sector 1, Itanagar, Arunachal Pradesh 791111",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "East Siang",
        nameHi: "पूर्व सियांग",
        constituencies: [
          {
            code: "PC02-AR",
            name: "Arunachal East",
            nameHi: "अरुणाचल पूर्व",
            type: "PARLIAMENTARY",
            totalVoters: 390000,
            pollingStations: [
              {
                stationCode: "ST-AR-02",
                name: "Jawaharlal Nehru College, Pasighat",
                nameHi: "जवाहरलाल नेहरू कॉलेज, पासीघाट",
                address: "Pasighat 791102",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 3. ASSAM
  {
    code: "AS",
    name: "Assam",
    nameHi: "असम",
    type: "STATE",
    totalSeats: 14,
    districts: [
      {
        name: "Kamrup Metropolitan",
        nameHi: "कामरूप महानगरीय",
        constituencies: [
          {
            code: "PC01-AS",
            name: "Guwahati",
            nameHi: "गुवाहाटी",
            type: "PARLIAMENTARY",
            totalVoters: 2100000,
            pollingStations: [
              {
                stationCode: "ST-AS-01",
                name: "Cotton University Administrative Block",
                nameHi: "कॉटन विश्वविद्यालय प्रशासनिक ब्लॉक",
                address: "Panbazar, Guwahati, Assam 781001",
                booths: [{ boothNumber: 1 }, { boothNumber: 2 }]
              }
            ]
          }
        ]
      },
      {
        name: "Dibrugarh",
        nameHi: "डिब्रूगढ़",
        constituencies: [
          {
            code: "PC02-AS",
            name: "Dibrugarh",
            nameHi: "डिब्रूगढ़",
            type: "PARLIAMENTARY",
            totalVoters: 1450000,
            pollingStations: [
              {
                stationCode: "ST-AS-02",
                name: "Dibrugarh Hanumanbax Surajmall Kanoi College",
                nameHi: "डीएचएसके कॉलेज, डिब्रूगढ़",
                address: "Kadamoni, Dibrugarh 786001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 4. BIHAR
  {
    code: "BR",
    name: "Bihar",
    nameHi: "बिहार",
    type: "STATE",
    totalSeats: 40,
    districts: [
      {
        name: "Patna",
        nameHi: "पटना",
        constituencies: [
          {
            code: "PC01-BR",
            name: "Patna Sahib",
            nameHi: "पटना साहिब",
            type: "PARLIAMENTARY",
            totalVoters: 1980000,
            pollingStations: [
              {
                stationCode: "ST-BR-01",
                name: "Patna High School, Gardanibagh",
                nameHi: "पटना हाई स्कूल, गर्दनीबाग",
                address: "Gardanibagh, Patna, Bihar 800001",
                booths: [{ boothNumber: 1 }, { boothNumber: 2 }]
              }
            ]
          },
          {
            code: "PC02-BR",
            name: "Pataliputra",
            nameHi: "पाटलिपुत्र",
            type: "PARLIAMENTARY",
            totalVoters: 1890000,
            pollingStations: [
              {
                stationCode: "ST-BR-02",
                name: "Anugrah Narayan College, Boring Road",
                nameHi: "एएन कॉलेज, बोरिंग रोड",
                address: "Boring Road, Patna 800013",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Gaya",
        nameHi: "गया",
        constituencies: [
          {
            code: "PC03-BR",
            name: "Gaya",
            nameHi: "गया",
            type: "PARLIAMENTARY",
            totalVoters: 1720000,
            pollingStations: [
              {
                stationCode: "ST-BR-03",
                name: "Gaya College Central Hall",
                nameHi: "गया कॉलेज सेंट्रल हॉल",
                address: "Rampur, Gaya, Bihar 823001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Muzaffarpur",
        nameHi: "मुजफ्फरपुर",
        constituencies: [
          {
            code: "PC04-BR",
            name: "Muzaffarpur",
            nameHi: "मुजफ्फरपुर",
            type: "PARLIAMENTARY",
            totalVoters: 1650000,
            pollingStations: [
              {
                stationCode: "ST-BR-04",
                name: "Langat Singh College, Muzaffarpur",
                nameHi: "एलएस कॉलेज, मुजफ्फरपुर",
                address: "Kalambagh Road, Muzaffarpur 842001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Bhagalpur",
        nameHi: "भागलपुर",
        constituencies: [
          {
            code: "PC05-BR",
            name: "Bhagalpur",
            nameHi: "भागलपुर",
            type: "PARLIAMENTARY",
            totalVoters: 1710000,
            pollingStations: [
              {
                stationCode: "ST-BR-05",
                name: "Marwari College, Bhagalpur",
                nameHi: "मारवाड़ी कॉलेज, भागलपुर",
                address: "Station Road, Bhagalpur 812001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Darbhanga",
        nameHi: "दरभंगा",
        constituencies: [
          {
            code: "PC06-BR",
            name: "Darbhanga",
            nameHi: "दरभंगा",
            type: "PARLIAMENTARY",
            totalVoters: 1580000,
            pollingStations: [
              {
                stationCode: "ST-BR-06",
                name: "CM College, Darbhanga",
                nameHi: "सीएम कॉलेज, दरभंगा",
                address: "Kilaghat, Darbhanga 846004",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Saran",
        nameHi: "सारण",
        constituencies: [
          {
            code: "PC07-BR",
            name: "Saran (Chhapra)",
            nameHi: "सारण (छपरा)",
            type: "PARLIAMENTARY",
            totalVoters: 1620000,
            pollingStations: [
              {
                stationCode: "ST-BR-07",
                name: "Rajendra College, Chhapra",
                nameHi: "राजेंद्र कॉलेज, छपरा",
                address: "Main Road, Chhapra 841301",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Nalanda",
        nameHi: "नालंदा",
        constituencies: [
          {
            code: "PC08-BR",
            name: "Nalanda",
            nameHi: "नालंदा",
            type: "PARLIAMENTARY",
            totalVoters: 1740000,
            pollingStations: [
              {
                stationCode: "ST-BR-08",
                name: "Kisan College, Sohsarai",
                nameHi: "किसान कॉलेज, सोहसराय",
                address: "Bihar Sharif, Nalanda 803118",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Purnia",
        nameHi: "पूर्णिया",
        constituencies: [
          {
            code: "PC09-BR",
            name: "Purnia",
            nameHi: "पूर्णिया",
            type: "PARLIAMENTARY",
            totalVoters: 1680000,
            pollingStations: [
              {
                stationCode: "ST-BR-09",
                name: "Purnea College, Purnia",
                nameHi: "पूर्णिया कॉलेज, पूर्णिया",
                address: "Rambagh, Purnia 854301",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Begusarai",
        nameHi: "बेगूसराय",
        constituencies: [
          {
            code: "PC10-BR",
            name: "Begusarai",
            nameHi: "बेगूसराय",
            type: "PARLIAMENTARY",
            totalVoters: 1790000,
            pollingStations: [
              {
                stationCode: "ST-BR-10",
                name: "GD College, Begusarai",
                nameHi: "जीडी कॉलेज, बेगूसराय",
                address: "Kapasiya, Begusarai 851101",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "East Champaran",
        nameHi: "पूर्वी चंपारण",
        constituencies: [
          {
            code: "PC11-BR",
            name: "Purvi Champaran (Motihari)",
            nameHi: "पूर्वी चंपारण (मोतिहारी)",
            type: "PARLIAMENTARY",
            totalVoters: 1630000,
            pollingStations: [
              {
                stationCode: "ST-BR-11",
                name: "MS College, Motihari",
                nameHi: "एमएस कॉलेज, मोतिहारी",
                address: "Motihari, East Champaran 845401",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "West Champaran",
        nameHi: "पश्चिम चंपारण",
        constituencies: [
          {
            code: "PC12-BR",
            name: "Paschim Champaran (Bettiah)",
            nameHi: "पश्चिम चंपारण (बेतिया)",
            type: "PARLIAMENTARY",
            totalVoters: 1590000,
            pollingStations: [
              {
                stationCode: "ST-BR-12",
                name: "MJK College, Bettiah",
                nameHi: "एमजेके कॉलेज, बेतिया",
                address: "Bettiah, West Champaran 845438",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Vaishali",
        nameHi: "वैशाली",
        constituencies: [
          {
            code: "PC13-BR",
            name: "Hajipur",
            nameHi: "हाजीपुर",
            type: "PARLIAMENTARY",
            totalVoters: 1760000,
            pollingStations: [
              {
                stationCode: "ST-BR-13",
                name: "RN College, Hajipur",
                nameHi: "आरएन कॉलेज, हाजीपुर",
                address: "Hajipur, Vaishali 844101",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Rohtas",
        nameHi: "रोहतास",
        constituencies: [
          {
            code: "PC14-BR",
            name: "Sasaram",
            nameHi: "सासाराम",
            type: "PARLIAMENTARY",
            totalVoters: 1640000,
            pollingStations: [
              {
                stationCode: "ST-BR-14",
                name: "SP Jain College, Sasaram",
                nameHi: "एसपी जैन कॉलेज, सासाराम",
                address: "Sasaram, Rohtas 821115",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Bhojpur",
        nameHi: "भोजपुर",
        constituencies: [
          {
            code: "PC15-BR",
            name: "Arrah",
            nameHi: "आरा",
            type: "PARLIAMENTARY",
            totalVoters: 1780000,
            pollingStations: [
              {
                stationCode: "ST-BR-15",
                name: "HD Jain College, Arrah",
                nameHi: "एचडी जैन कॉलेज, आरा",
                address: "Arrah, Bhojpur 802301",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Samastipur",
        nameHi: "समस्तीपुर",
        constituencies: [
          {
            code: "PC16-BR",
            name: "Samastipur",
            nameHi: "समस्तीपुर",
            type: "PARLIAMENTARY",
            totalVoters: 1690000,
            pollingStations: [
              {
                stationCode: "ST-BR-16",
                name: "Samastipur College, Samastipur",
                nameHi: "समस्तीपुर कॉलेज, समस्तीपुर",
                address: "Kashipur, Samastipur 848101",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Madhubani",
        nameHi: "मधुबनी",
        constituencies: [
          {
            code: "PC17-BR",
            name: "Madhubani",
            nameHi: "मधुबनी",
            type: "PARLIAMENTARY",
            totalVoters: 1730000,
            pollingStations: [
              {
                stationCode: "ST-BR-17",
                name: "RK College, Madhubani",
                nameHi: "आरके कॉलेज, मधुबनी",
                address: "Madhubani 847211",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Katihar",
        nameHi: "कटिहार",
        constituencies: [
          {
            code: "PC18-BR",
            name: "Katihar",
            nameHi: "कटिहार",
            type: "PARLIAMENTARY",
            totalVoters: 1610000,
            pollingStations: [
              {
                stationCode: "ST-BR-18",
                name: "DS College, Katihar",
                nameHi: "डीएस कॉलेज, कटिहार",
                address: "Katihar 854105",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Munger",
        nameHi: "मुंगेर",
        constituencies: [
          {
            code: "PC19-BR",
            name: "Munger",
            nameHi: "मुंगेर",
            type: "PARLIAMENTARY",
            totalVoters: 1670000,
            pollingStations: [
              {
                stationCode: "ST-BR-19",
                name: "RD & DJ College, Munger",
                nameHi: "आरडी एंड डीजे कॉलेज, मुंगेर",
                address: "Munger 811201",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Nawada",
        nameHi: "नवादा",
        constituencies: [
          {
            code: "PC20-BR",
            name: "Nawada",
            nameHi: "नवादा",
            type: "PARLIAMENTARY",
            totalVoters: 1750000,
            pollingStations: [
              {
                stationCode: "ST-BR-20",
                name: "TS College, Nawada",
                nameHi: "टीएस कॉलेज, नवादा",
                address: "Nawada 805110",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Aurangabad",
        nameHi: "औरंगाबाद",
        constituencies: [
          {
            code: "PC21-BR",
            name: "Aurangabad",
            nameHi: "औरंगाबाद",
            type: "PARLIAMENTARY",
            totalVoters: 1710000,
            pollingStations: [
              {
                stationCode: "ST-BR-21",
                name: "Sinha College, Aurangabad",
                nameHi: "सिन्हा कॉलेज, औरंगाबाद",
                address: "Aurangabad 824101",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Buxar",
        nameHi: "बक्सर",
        constituencies: [
          {
            code: "PC22-BR",
            name: "Buxar",
            nameHi: "बक्सर",
            type: "PARLIAMENTARY",
            totalVoters: 1620000,
            pollingStations: [
              {
                stationCode: "ST-BR-22",
                name: "MV College, Buxar",
                nameHi: "एमवी कॉलेज, बक्सर",
                address: "Buxar 802101",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Siwan",
        nameHi: "सीवान",
        constituencies: [
          {
            code: "PC23-BR",
            name: "Siwan",
            nameHi: "सीवान",
            type: "PARLIAMENTARY",
            totalVoters: 1780000,
            pollingStations: [
              {
                stationCode: "ST-BR-23",
                name: "DAV PG College, Siwan",
                nameHi: "डीएवी पीजी कॉलेज, सीवान",
                address: "Siwan 841226",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Gopalganj",
        nameHi: "गोपालगंज",
        constituencies: [
          {
            code: "PC24-BR",
            name: "Gopalganj",
            nameHi: "गोपालगंज",
            type: "PARLIAMENTARY",
            totalVoters: 1690000,
            pollingStations: [
              {
                stationCode: "ST-BR-24",
                name: "Kamla Rai College, Gopalganj",
                nameHi: "कमला राय कॉलेज, गोपालगंज",
                address: "Gopalganj 841428",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Sitamarhi",
        nameHi: "सीतामढ़ी",
        constituencies: [
          {
            code: "PC25-BR",
            name: "Sitamarhi",
            nameHi: "सीतामढ़ी",
            type: "PARLIAMENTARY",
            totalVoters: 1740000,
            pollingStations: [
              {
                stationCode: "ST-BR-25",
                name: "SRK Goenka College, Sitamarhi",
                nameHi: "एसआरके गोयनका कॉलेज, सीतामढ़ी",
                address: "Sitamarhi 843302",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Supaul",
        nameHi: "सुपौल",
        constituencies: [
          {
            code: "PC26-BR",
            name: "Supaul",
            nameHi: "सुपौल",
            type: "PARLIAMENTARY",
            totalVoters: 1660000,
            pollingStations: [
              {
                stationCode: "ST-BR-26",
                name: "BSSS College, Supaul",
                nameHi: "बीएसएसएस कॉलेज, सुपौल",
                address: "Supaul 852131",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Saharsa",
        nameHi: "सहरसा",
        constituencies: [
          {
            code: "PC27-BR",
            name: "Saharsa (Madhepura PC)",
            nameHi: "सहरसा (मधेपुरा)",
            type: "PARLIAMENTARY",
            totalVoters: 1680000,
            pollingStations: [
              {
                stationCode: "ST-BR-27",
                name: "MLT College, Saharsa",
                nameHi: "एमएलटी कॉलेज, सहरसा",
                address: "Saharsa 852201",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Madhepura",
        nameHi: "मधेपुरा",
        constituencies: [
          {
            code: "PC28-BR",
            name: "Madhepura",
            nameHi: "मधेपुरा",
            type: "PARLIAMENTARY",
            totalVoters: 1710000,
            pollingStations: [
              {
                stationCode: "ST-BR-28",
                name: "BN Mandal University Campus",
                nameHi: "बीएन मंडल विश्वविद्यालय परिसर",
                address: "Madhepura 852113",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Kishanganj",
        nameHi: "किशनगंज",
        constituencies: [
          {
            code: "PC29-BR",
            name: "Kishanganj",
            nameHi: "किशनगंज",
            type: "PARLIAMENTARY",
            totalVoters: 1590000,
            pollingStations: [
              {
                stationCode: "ST-BR-29",
                name: "Nehru College, Kishanganj",
                nameHi: "नेहरू कॉलेज, किशनगंज",
                address: "Kishanganj 855107",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Araria",
        nameHi: "अररिया",
        constituencies: [
          {
            code: "PC30-BR",
            name: "Araria",
            nameHi: "अररिया",
            type: "PARLIAMENTARY",
            totalVoters: 1720000,
            pollingStations: [
              {
                stationCode: "ST-BR-30",
                name: "Araria College, Araria",
                nameHi: "अररिया कॉलेज, अररिया",
                address: "Araria 854311",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Khagaria",
        nameHi: "खगड़िया",
        constituencies: [
          {
            code: "PC31-BR",
            name: "Khagaria",
            nameHi: "खगड़िया",
            type: "PARLIAMENTARY",
            totalVoters: 1610000,
            pollingStations: [
              {
                stationCode: "ST-BR-31",
                name: "KOS College, Khagaria",
                nameHi: "केओएस कॉलेज, खगड़िया",
                address: "Khagaria 851204",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Banka",
        nameHi: "बांका",
        constituencies: [
          {
            code: "PC32-BR",
            name: "Banka",
            nameHi: "बांका",
            type: "PARLIAMENTARY",
            totalVoters: 1650000,
            pollingStations: [
              {
                stationCode: "ST-BR-32",
                name: "PBM College, Banka",
                nameHi: "पीबीएम कॉलेज, बांका",
                address: "Banka 814102",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Jamui",
        nameHi: "जमुई",
        constituencies: [
          {
            code: "PC33-BR",
            name: "Jamui",
            nameHi: "जमुई",
            type: "PARLIAMENTARY",
            totalVoters: 1670000,
            pollingStations: [
              {
                stationCode: "ST-BR-33",
                name: "KKM College, Jamui",
                nameHi: "केकेएम कॉलेज, जमुई",
                address: "Jamui 811307",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Lakhisarai",
        nameHi: "लखीसराय",
        constituencies: [
          {
            code: "PC34-BR",
            name: "Lakhisarai (Munger PC)",
            nameHi: "लखीसराय (मुंगेर)",
            type: "PARLIAMENTARY",
            totalVoters: 1540000,
            pollingStations: [
              {
                stationCode: "ST-BR-34",
                name: "KSSS College, Lakhisarai",
                nameHi: "केएसएसएस कॉलेज, लखीसराय",
                address: "Lakhisarai 811311",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Sheikhpura",
        nameHi: "शेखपुरा",
        constituencies: [
          {
            code: "PC35-BR",
            name: "Sheikhpura (Nawada PC)",
            nameHi: "शेखपुरा (नवादा)",
            type: "PARLIAMENTARY",
            totalVoters: 1480000,
            pollingStations: [
              {
                stationCode: "ST-BR-35",
                name: "RD College, Sheikhpura",
                nameHi: "आरडी कॉलेज, शेखपुरा",
                address: "Sheikhpura 811105",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Arwal",
        nameHi: "अरवल",
        constituencies: [
          {
            code: "PC36-BR",
            name: "Arwal (Karakat PC)",
            nameHi: "अरवल (काराकाट)",
            type: "PARLIAMENTARY",
            totalVoters: 1420000,
            pollingStations: [
              {
                stationCode: "ST-BR-36",
                name: "Govt High School, Arwal",
                nameHi: "सरकारी हाई स्कूल, अरवल",
                address: "Arwal 804401",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Kaimur",
        nameHi: "कैमूर",
        constituencies: [
          {
            code: "PC37-BR",
            name: "Kaimur (Bhabua)",
            nameHi: "कैमूर (भभुआ)",
            type: "PARLIAMENTARY",
            totalVoters: 1560000,
            pollingStations: [
              {
                stationCode: "ST-BR-37",
                name: "SVP College, Bhabua",
                nameHi: "एसवीपी कॉलेज, भभुआ",
                address: "Bhabua, Kaimur 821101",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Sheohar",
        nameHi: "शिवहर",
        constituencies: [
          {
            code: "PC38-BR",
            name: "Sheohar",
            nameHi: "शिवहर",
            type: "PARLIAMENTARY",
            totalVoters: 1490000,
            pollingStations: [
              {
                stationCode: "ST-BR-38",
                name: "Nawab High School, Sheohar",
                nameHi: "नवाब हाई स्कूल, शिवहर",
                address: "Sheohar 843329",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Jehanabad",
        nameHi: "जहानाबाद",
        constituencies: [
          {
            code: "PC39-BR",
            name: "Jehanabad",
            nameHi: "जहानाबाद",
            type: "PARLIAMENTARY",
            totalVoters: 1580000,
            pollingStations: [
              {
                stationCode: "ST-BR-39",
                name: "SS College, Jehanabad",
                nameHi: "एसएस कॉलेज, जहानाबाद",
                address: "Jehanabad 804408",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 5. CHHATTISGARH
  {
    code: "CG",
    name: "Chhattisgarh",
    nameHi: "छत्तीसगढ़",
    type: "STATE",
    totalSeats: 11,
    districts: [
      {
        name: "Raipur",
        nameHi: "रायपुर",
        constituencies: [
          {
            code: "PC01-CG",
            name: "Raipur",
            nameHi: "रायपुर",
            type: "PARLIAMENTARY",
            totalVoters: 1650000,
            pollingStations: [
              {
                stationCode: "ST-CG-01",
                name: "Govt Science College, Raipur",
                nameHi: "शासकीय विज्ञान महाविद्यालय, रायपुर",
                address: "GE Road, Raipur, Chhattisgarh 492010",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Durg",
        nameHi: "दुर्ग",
        constituencies: [
          {
            code: "PC02-CG",
            name: "Durg",
            nameHi: "दुर्ग",
            type: "PARLIAMENTARY",
            totalVoters: 1580000,
            pollingStations: [
              {
                stationCode: "ST-CG-02",
                name: "Bhilai Institute of Technology",
                nameHi: "भिलाई प्रौद्योगिकी संस्थान",
                address: "Bhilai, Durg 490006",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 6. GOA
  {
    code: "GA",
    name: "Goa",
    nameHi: "गोवा",
    type: "STATE",
    totalSeats: 2,
    districts: [
      {
        name: "North Goa",
        nameHi: "उत्तर गोवा",
        constituencies: [
          {
            code: "PC01-GA",
            name: "North Goa",
            nameHi: "उत्तर गोवा",
            type: "PARLIAMENTARY",
            totalVoters: 550000,
            pollingStations: [
              {
                stationCode: "ST-GA-01",
                name: "Don Bosco High School, Panaji",
                nameHi: "डॉन बॉस्को हाई स्कूल, पणजी",
                address: "MG Road, Panaji, Goa 403001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "South Goa",
        nameHi: "दक्षिण गोवा",
        constituencies: [
          {
            code: "PC02-GA",
            name: "South Goa",
            nameHi: "दक्षिण गोवा",
            type: "PARLIAMENTARY",
            totalVoters: 580000,
            pollingStations: [
              {
                stationCode: "ST-GA-02",
                name: "Loyola High School, Margao",
                nameHi: "लोयोला हाई स्कूल, मडगांव",
                address: "Margao, Goa 403601",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 7. GUJARAT
  {
    code: "GJ",
    name: "Gujarat",
    nameHi: "गुजरात",
    type: "STATE",
    totalSeats: 26,
    districts: [
      {
        name: "Ahmedabad",
        nameHi: "अहमदाबाद",
        constituencies: [
          {
            code: "PC01-GJ",
            name: "Ahmedabad East",
            nameHi: "अहमदाबाद पूर्व",
            type: "PARLIAMENTARY",
            totalVoters: 1810000,
            pollingStations: [
              {
                stationCode: "ST-GJ-01",
                name: "LD College of Engineering, Navrangpura",
                nameHi: "एलडी कॉलेज ऑफ इंजीनियरिंग, नवरंगपुरा",
                address: "Navrangpura, Ahmedabad, Gujarat 380015",
                booths: [{ boothNumber: 1 }]
              }
            ]
          },
          {
            code: "PC02-GJ",
            name: "Ahmedabad West",
            nameHi: "अहमदाबाद पश्चिम",
            type: "PARLIAMENTARY",
            totalVoters: 1680000,
            pollingStations: [
              {
                stationCode: "ST-GJ-02",
                name: "Gujarat College, Ellisbridge",
                nameHi: "गुजरात कॉलेज, एलिसब्रिज",
                address: "Ellisbridge, Ahmedabad 380006",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Surat",
        nameHi: "सूरत",
        constituencies: [
          {
            code: "PC03-GJ",
            name: "Surat",
            nameHi: "सूरत",
            type: "PARLIAMENTARY",
            totalVoters: 1750000,
            pollingStations: [
              {
                stationCode: "ST-GJ-03",
                name: "SVNIT Campus, Piplod",
                nameHi: "एसवीएनआईटी कैंपस, पिपलोद",
                address: "Dumas Road, Surat 395007",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 8. HARYANA
  {
    code: "HR",
    name: "Haryana",
    nameHi: "हरियाणा",
    type: "STATE",
    totalSeats: 10,
    districts: [
      {
        name: "Gurugram",
        nameHi: "गुरुग्राम",
        constituencies: [
          {
            code: "PC01-HR",
            name: "Gurgaon",
            nameHi: "गुडगाँव",
            type: "PARLIAMENTARY",
            totalVoters: 2150000,
            pollingStations: [
              {
                stationCode: "ST-HR-01",
                name: "Govt Boys Senior Secondary School",
                nameHi: "सरकारी बालक उच्चतर माध्यमिक विद्यालय",
                address: "Civil Lines, Gurugram, Haryana 122001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Faridabad",
        nameHi: "फरीदाबाद",
        constituencies: [
          {
            code: "PC02-HR",
            name: "Faridabad",
            nameHi: "फरीदाबाद",
            type: "PARLIAMENTARY",
            totalVoters: 1980000,
            pollingStations: [
              {
                stationCode: "ST-HR-02",
                name: "KL Mehta Dayanand College",
                nameHi: "केएल मेहता दयानंद कॉलेज",
                address: "NIT Faridabad 121001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 9. HIMACHAL PRADESH
  {
    code: "HP",
    name: "Himachal Pradesh",
    nameHi: "हिमाचल प्रदेश",
    type: "STATE",
    totalSeats: 4,
    districts: [
      {
        name: "Shimla",
        nameHi: "शिमला",
        constituencies: [
          {
            code: "PC01-HP",
            name: "Shimla",
            nameHi: "शिमला",
            type: "PARLIAMENTARY",
            totalVoters: 1320000,
            pollingStations: [
              {
                stationCode: "ST-HP-01",
                name: "Govt Degree College, Sanjauli",
                nameHi: "सरकारी डिग्री कॉलेज, संजोली",
                address: "Sanjauli, Shimla, Himachal Pradesh 171006",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Mandi",
        nameHi: "मंडी",
        constituencies: [
          {
            code: "PC02-HP",
            name: "Mandi",
            nameHi: "मंडी",
            type: "PARLIAMENTARY",
            totalVoters: 1370000,
            pollingStations: [
              {
                stationCode: "ST-HP-02",
                name: "Vallabh Govt College, Mandi",
                nameHi: "वल्लभ सरकारी कॉलेज, मंडी",
                address: "Mandi 175001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 10. JHARKHAND
  {
    code: "JH",
    name: "Jharkhand",
    nameHi: "झारखंड",
    type: "STATE",
    totalSeats: 14,
    districts: [
      {
        name: "Ranchi",
        nameHi: "राँची",
        constituencies: [
          {
            code: "PC01-JH",
            name: "Ranchi",
            nameHi: "राँची",
            type: "PARLIAMENTARY",
            totalVoters: 1910000,
            pollingStations: [
              {
                stationCode: "ST-JH-01",
                name: "St. Xavier's College, Ranchi",
                nameHi: "सेंट जेवियर्स कॉलेज, राँची",
                address: "Purulia Road, Ranchi, Jharkhand 834001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "East Singhbhum",
        nameHi: "पूर्वी सिंहभूम",
        constituencies: [
          {
            code: "PC02-JH",
            name: "Jamshedpur",
            nameHi: "जमशेदपुर",
            type: "PARLIAMENTARY",
            totalVoters: 1740000,
            pollingStations: [
              {
                stationCode: "ST-JH-02",
                name: "Jamshedpur Co-operative College",
                nameHi: "जमशेदपुर कोऑपरेटिव कॉलेज",
                address: "Circuit House Area, Jamshedpur 831001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 11. KARNATAKA
  {
    code: "KA",
    name: "Karnataka",
    nameHi: "कर्नाटक",
    type: "STATE",
    totalSeats: 28,
    districts: [
      {
        name: "Bengaluru Urban",
        nameHi: "बेंगलुरु शहरी",
        constituencies: [
          {
            code: "PC05-KA",
            name: "Bengaluru South",
            nameHi: "बेंगलुरु दक्षिण",
            type: "PARLIAMENTARY",
            totalVoters: 2010000,
            pollingStations: [
              {
                stationCode: "ST-KA-01",
                name: "National College, Basavanagudi",
                nameHi: "नेशनल कॉलेज, बसवनगुडी",
                address: "Basavanagudi, Bengaluru, Karnataka 560004",
                booths: [{ boothNumber: 1 }, { boothNumber: 2 }]
              }
            ]
          },
          {
            code: "PC06-KA",
            name: "Bengaluru Central",
            nameHi: "बेंगलुरु मध्य",
            type: "PARLIAMENTARY",
            totalVoters: 1950000,
            pollingStations: [
              {
                stationCode: "ST-KA-02",
                name: "St. Joseph's College of Commerce",
                nameHi: "सेंट जोसेफ कॉलेज ऑफ कॉमर्स",
                address: "Brigade Road, Bengaluru 560025",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Mysuru",
        nameHi: "मैसूरु",
        constituencies: [
          {
            code: "PC07-KA",
            name: "Mysore",
            nameHi: "मैसूरु",
            type: "PARLIAMENTARY",
            totalVoters: 1890000,
            pollingStations: [
              {
                stationCode: "ST-KA-03",
                name: "Maharaja's College, Mysuru",
                nameHi: "महाराजा कॉलेज, मैसूरु",
                address: "JL Puram, Mysuru 570005",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 12. KERALA
  {
    code: "KL",
    name: "Kerala",
    nameHi: "केरल",
    type: "STATE",
    totalSeats: 20,
    districts: [
      {
        name: "Wayanad",
        nameHi: "वायनाड",
        constituencies: [
          {
            code: "PC03-KL",
            name: "Wayanad",
            nameHi: "वायनाड",
            type: "PARLIAMENTARY",
            totalVoters: 1380000,
            pollingStations: [
              {
                stationCode: "ST-KL-01",
                name: "St. Joseph Higher Secondary School",
                nameHi: "सेंट जोसेफ हायर सेकेंडरी स्कूल",
                address: "Sultan Bathery, Wayanad, Kerala 673592",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Thiruvananthapuram",
        nameHi: "तिरुवनंतपुरम",
        constituencies: [
          {
            code: "PC04-KL",
            name: "Thiruvananthapuram",
            nameHi: "तिरुवनंतपुरम",
            type: "PARLIAMENTARY",
            totalVoters: 1410000,
            pollingStations: [
              {
                stationCode: "ST-KL-02",
                name: "University College, Palayam",
                nameHi: "यूनिवर्सिटी कॉलेज, पालयम",
                address: "Palayam, Thiruvananthapuram, Kerala 695034",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 13. MADHYA PRADESH
  {
    code: "MP",
    name: "Madhya Pradesh",
    nameHi: "मध्य प्रदेश",
    type: "STATE",
    totalSeats: 29,
    districts: [
      {
        name: "Bhopal",
        nameHi: "भोपाल",
        constituencies: [
          {
            code: "PC01-MP",
            name: "Bhopal",
            nameHi: "भोपाल",
            type: "PARLIAMENTARY",
            totalVoters: 2110000,
            pollingStations: [
              {
                stationCode: "ST-MP-01",
                name: "MANIT Bhopal Campus",
                nameHi: "मैनिट भोपाल कैंपस",
                address: "Link Road Number 3, Bhopal, Madhya Pradesh 462003",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Indore",
        nameHi: "इंदौर",
        constituencies: [
          {
            code: "PC02-MP",
            name: "Indore",
            nameHi: "इंदौर",
            type: "PARLIAMENTARY",
            totalVoters: 2350000,
            pollingStations: [
              {
                stationCode: "ST-MP-02",
                name: "Holkar Science College, Indore",
                nameHi: "होलकर साइंस कॉलेज, इंदौर",
                address: "AB Road, Indore 452001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 14. MAHARASHTRA
  {
    code: "MH",
    name: "Maharashtra",
    nameHi: "महाराष्ट्र",
    type: "STATE",
    totalSeats: 48,
    districts: [
      {
        name: "Mumbai City",
        nameHi: "मुंबई शहर",
        constituencies: [
          {
            code: "PC01-MH",
            name: "Mumbai South",
            nameHi: "दक्षिण मुंबई",
            type: "PARLIAMENTARY",
            totalVoters: 1548000,
            pollingStations: [
              {
                stationCode: "ST-MH-01",
                name: "St. Xavier High School, Dhobi Talao",
                nameHi: "सेंट जेवियर्स हाई स्कूल, धोबी तलाव",
                address: "5, Mahapalika Marg, Mumbai, Maharashtra 400001",
                booths: [{ boothNumber: 1 }, { boothNumber: 2 }]
              }
            ]
          },
          {
            code: "PC02-MH",
            name: "Mumbai South Central",
            nameHi: "मुंबई दक्षिण मध्य",
            type: "PARLIAMENTARY",
            totalVoters: 1440000,
            pollingStations: [
              {
                stationCode: "ST-MH-02",
                name: "Veermata Jijabai Technological Institute (VJTI)",
                nameHi: "वीजीटीआई कॉलेज, माटुंगा",
                address: "H. R. Mahajani Road, Matunga, Mumbai 400019",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Pune",
        nameHi: "पुणे",
        constituencies: [
          {
            code: "PC03-MH",
            name: "Pune",
            nameHi: "पुणे",
            type: "PARLIAMENTARY",
            totalVoters: 2020000,
            pollingStations: [
              {
                stationCode: "ST-MH-03",
                name: "Fergusson College, FC Road",
                nameHi: "फरग्यूसन कॉलेज, एफसी रोड",
                address: "FC Road, Shivajinagar, Pune 411004",
                booths: [{ boothNumber: 1 }, { boothNumber: 2 }]
              }
            ]
          }
        ]
      },
      {
        name: "Nagpur",
        nameHi: "नागपुर",
        constituencies: [
          {
            code: "PC04-MH",
            name: "Nagpur",
            nameHi: "नागपुर",
            type: "PARLIAMENTARY",
            totalVoters: 2150000,
            pollingStations: [
              {
                stationCode: "ST-MH-04",
                name: "Hislop College, Civil Lines",
                nameHi: "हिस्लॉप कॉलेज, सिविल लाइंस",
                address: "Civil Lines, Nagpur 440001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 15. MANIPUR
  {
    code: "MN",
    name: "Manipur",
    nameHi: "मणिपुर",
    type: "STATE",
    totalSeats: 2,
    districts: [
      {
        name: "Imphal West",
        nameHi: "इम्फाल पश्चिम",
        constituencies: [
          {
            code: "PC01-MN",
            name: "Inner Manipur",
            nameHi: "आंतरिक मणिपुर",
            type: "PARLIAMENTARY",
            totalVoters: 920000,
            pollingStations: [
              {
                stationCode: "ST-MN-01",
                name: "DM College of Science",
                nameHi: "डीएम कॉलेज ऑफ साइंस",
                address: "Thangmeiband, Imphal, Manipur 795001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Churachandpur",
        nameHi: "चुराचांदपुर",
        constituencies: [
          {
            code: "PC02-MN",
            name: "Outer Manipur",
            nameHi: "बाहरी मणिपुर",
            type: "PARLIAMENTARY",
            totalVoters: 1020000,
            pollingStations: [
              {
                stationCode: "ST-MN-02",
                name: "Govt Higher Secondary School, Churachandpur",
                nameHi: "सरकारी उच्चतर माध्यमिक विद्यालय, चुराचांदपुर",
                address: "Churachandpur 795128",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 16. MEGHALAYA
  {
    code: "ML",
    name: "Meghalaya",
    nameHi: "मेघालय",
    type: "STATE",
    totalSeats: 2,
    districts: [
      {
        name: "East Khasi Hills",
        nameHi: "पूर्वी खासी हिल्स",
        constituencies: [
          {
            code: "PC01-ML",
            name: "Shillong",
            nameHi: "शिलांग",
            type: "PARLIAMENTARY",
            totalVoters: 1190000,
            pollingStations: [
              {
                stationCode: "ST-ML-01",
                name: "St. Anthony's College, Shillong",
                nameHi: "सेंट एंथोनी कॉलेज, शिलांग",
                address: "Laitumkhrah, Shillong, Meghalaya 793003",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "West Garo Hills",
        nameHi: "पश्चिम गारो हिल्स",
        constituencies: [
          {
            code: "PC02-ML",
            name: "Tura",
            nameHi: "तुरा",
            type: "PARLIAMENTARY",
            totalVoters: 740000,
            pollingStations: [
              {
                stationCode: "ST-ML-02",
                name: "Don Bosco College, Tura",
                nameHi: "डॉन बॉस्को कॉलेज, तुरा",
                address: "Tura 794002",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 17. MIZORAM
  {
    code: "MZ",
    name: "Mizoram",
    nameHi: "मिजोरम",
    type: "STATE",
    totalSeats: 1,
    districts: [
      {
        name: "Aizawl",
        nameHi: "आइज़ोल",
        constituencies: [
          {
            code: "PC01-MZ",
            name: "Mizoram",
            nameHi: "मिजोरम",
            type: "PARLIAMENTARY",
            totalVoters: 850000,
            pollingStations: [
              {
                stationCode: "ST-MZ-01",
                name: "Pachhunga University College",
                nameHi: "पछूंगा यूनिवर्सिटी कॉलेज",
                address: "College Veng, Aizawl, Mizoram 796001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 18. NAGALAND
  {
    code: "NL",
    name: "Nagaland",
    nameHi: "नागालैंड",
    type: "STATE",
    totalSeats: 1,
    districts: [
      {
        name: "Kohima",
        nameHi: "कोहिमा",
        constituencies: [
          {
            code: "PC01-NL",
            name: "Nagaland",
            nameHi: "नागालैंड",
            type: "PARLIAMENTARY",
            totalVoters: 1320000,
            pollingStations: [
              {
                stationCode: "ST-NL-01",
                name: "Kohima Science College, Jotsoma",
                nameHi: "कोहिमा साइंस कॉलेज, जोत्सोमा",
                address: "Jotsoma, Kohima, Nagaland 797002",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 19. ODISHA
  {
    code: "OD",
    name: "Odisha",
    nameHi: "ओडिशा",
    type: "STATE",
    totalSeats: 21,
    districts: [
      {
        name: "Khordha (Bhubaneswar)",
        nameHi: "खोर्धा (भुवनेश्वर)",
        constituencies: [
          {
            code: "PC01-OD",
            name: "Bhubaneswar",
            nameHi: "भुवनेश्वर",
            type: "PARLIAMENTARY",
            totalVoters: 1680000,
            pollingStations: [
              {
                stationCode: "ST-OD-01",
                name: "BJD Hall & BJB Autonomous College",
                nameHi: "बीजीबी स्वायत्त कॉलेज, भुवनेश्वर",
                address: "BJB Nagar, Bhubaneswar, Odisha 751014",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Cuttack",
        nameHi: "कटक",
        constituencies: [
          {
            code: "PC02-OD",
            name: "Cuttack",
            nameHi: "कटक",
            type: "PARLIAMENTARY",
            totalVoters: 1540000,
            pollingStations: [
              {
                stationCode: "ST-OD-02",
                name: "Ravenshaw University Main Hall",
                nameHi: "रेवेनशॉ विश्वविद्यालय",
                address: "College Square, Cuttack 753003",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 20. PUNJAB
  {
    code: "PB",
    name: "Punjab",
    nameHi: "पंजाब",
    type: "STATE",
    totalSeats: 13,
    districts: [
      {
        name: "Amritsar",
        nameHi: "अमृतसर",
        constituencies: [
          {
            code: "PC01-PB",
            name: "Amritsar",
            nameHi: "अमृतसर",
            type: "PARLIAMENTARY",
            totalVoters: 1580000,
            pollingStations: [
              {
                stationCode: "ST-PB-01",
                name: "Khalsa College Amritsar",
                nameHi: "खालसा कॉलेज अमृतसर",
                address: "GT Road, Amritsar, Punjab 143002",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Ludhiana",
        nameHi: "लुधियाना",
        constituencies: [
          {
            code: "PC02-PB",
            name: "Ludhiana",
            nameHi: "लुधियाना",
            type: "PARLIAMENTARY",
            totalVoters: 1720000,
            pollingStations: [
              {
                stationCode: "ST-PB-02",
                name: "SCD Govt College, Ludhiana",
                nameHi: "एससीडी सरकारी कॉलेज",
                address: "College Road, Ludhiana 141001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 21. RAJASTHAN
  {
    code: "RJ",
    name: "Rajasthan",
    nameHi: "राजस्थान",
    type: "STATE",
    totalSeats: 25,
    districts: [
      {
        name: "Jaipur",
        nameHi: "जयपुर",
        constituencies: [
          {
            code: "PC01-RJ",
            name: "Jaipur",
            nameHi: "जयपुर",
            type: "PARLIAMENTARY",
            totalVoters: 2130000,
            pollingStations: [
              {
                stationCode: "ST-RJ-01",
                name: "Maharaja's College, JLN Marg",
                nameHi: "महाराजा कॉलेज, जेएलएन मार्ग",
                address: "JLN Marg, Jaipur, Rajasthan 302004",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Jodhpur",
        nameHi: "जोधपुर",
        constituencies: [
          {
            code: "PC02-RJ",
            name: "Jodhpur",
            nameHi: "जोधपुर",
            type: "PARLIAMENTARY",
            totalVoters: 1950000,
            pollingStations: [
              {
                stationCode: "ST-RJ-02",
                name: "Jai Narain Vyas University Main Campus",
                nameHi: "जय नारायण व्यास विश्वविद्यालय",
                address: "Ratanada, Jodhpur 342011",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 22. SIKKIM
  {
    code: "SK",
    name: "Sikkim",
    nameHi: "सिक्किम",
    type: "STATE",
    totalSeats: 1,
    districts: [
      {
        name: "Gangtok",
        nameHi: "गंगटोक",
        constituencies: [
          {
            code: "PC01-SK",
            name: "Sikkim",
            nameHi: "सिक्किम",
            type: "PARLIAMENTARY",
            totalVoters: 440000,
            pollingStations: [
              {
                stationCode: "ST-SK-01",
                name: "Nar Bahadur Bhandari Degree College, Tadong",
                nameHi: "एनबीबी डिग्री कॉलेज, तादोंग",
                address: "Tadong, Gangtok, Sikkim 737102",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 23. TAMIL NADU
  {
    code: "TN",
    name: "Tamil Nadu",
    nameHi: "तमिलनाडु",
    type: "STATE",
    totalSeats: 39,
    districts: [
      {
        name: "Chennai",
        nameHi: "चेन्नई",
        constituencies: [
          {
            code: "PC01-TN",
            name: "Chennai South",
            nameHi: "दक्षिण चेन्नई",
            type: "PARLIAMENTARY",
            totalVoters: 2050000,
            pollingStations: [
              {
                stationCode: "ST-TN-01",
                name: "Presidency College, Kamarajar Salai",
                nameHi: "प्रेसिडेंसी कॉलेज, कामराजर सलाई",
                address: "Chepauk, Chennai, Tamil Nadu 600005",
                booths: [{ boothNumber: 1 }, { boothNumber: 2 }]
              }
            ]
          },
          {
            code: "PC02-TN",
            name: "Chennai Central",
            nameHi: "मध्य चेन्नई",
            type: "PARLIAMENTARY",
            totalVoters: 1350000,
            pollingStations: [
              {
                stationCode: "ST-TN-02",
                name: "Loyola College, Nungambakkam",
                nameHi: "लोयोला कॉलेज, नुंगमबक्कम",
                address: "Nungambakkam, Chennai 600034",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Coimbatore",
        nameHi: "कोयंबटूर",
        constituencies: [
          {
            code: "PC03-TN",
            name: "Coimbatore",
            nameHi: "कोयंबटूर",
            type: "PARLIAMENTARY",
            totalVoters: 1980000,
            pollingStations: [
              {
                stationCode: "ST-TN-03",
                name: "Government Arts College, Coimbatore",
                nameHi: "सरकारी कला कॉलेज, कोयंबटूर",
                address: "Arts College Road, Coimbatore 641018",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 24. TELANGANA
  {
    code: "TG",
    name: "Telangana",
    nameHi: "तेलंगाना",
    type: "STATE",
    totalSeats: 17,
    districts: [
      {
        name: "Hyderabad",
        nameHi: "हैदराबाद",
        constituencies: [
          {
            code: "PC01-TG",
            name: "Hyderabad",
            nameHi: "हैदराबाद",
            type: "PARLIAMENTARY",
            totalVoters: 1950000,
            pollingStations: [
              {
                stationCode: "ST-TG-01",
                name: "Nizam College, Basheerbagh",
                nameHi: "निजाम कॉलेज, बशीरबाग",
                address: "Basheerbagh, Hyderabad, Telangana 500001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          },
          {
            code: "PC02-TG",
            name: "Secunderabad",
            nameHi: "सिकंदराबाद",
            type: "PARLIAMENTARY",
            totalVoters: 1880000,
            pollingStations: [
              {
                stationCode: "ST-TG-02",
                name: "Wesley Co-Ed Junior College",
                nameHi: "वेस्ली जूनियर कॉलेज",
                address: "Secunderabad 500003",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 25. TRIPURA
  {
    code: "TR",
    name: "Tripura",
    nameHi: "त्रिपुरा",
    type: "STATE",
    totalSeats: 2,
    districts: [
      {
        name: "West Tripura",
        nameHi: "पश्चिम त्रिपुरा",
        constituencies: [
          {
            code: "PC01-TR",
            name: "Tripura West",
            nameHi: "त्रिपुरा पश्चिम",
            type: "PARLIAMENTARY",
            totalVoters: 1350000,
            pollingStations: [
              {
                stationCode: "ST-TR-01",
                name: "MBB College, Agartala",
                nameHi: "एमबीबी कॉलेज, अगरतला",
                address: "Agartala, Tripura 799004",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "South Tripura",
        nameHi: "दक्षिण त्रिपुरा",
        constituencies: [
          {
            code: "PC02-TR",
            name: "Tripura East",
            nameHi: "त्रिपुरा पूर्व",
            type: "PARLIAMENTARY",
            totalVoters: 1290000,
            pollingStations: [
              {
                stationCode: "ST-TR-02",
                name: "Govt Degree College, Belonia",
                nameHi: "सरकारी डिग्री कॉलेज, बेलोोनिया",
                address: "Belonia 799155",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 26. UTTAR PRADESH
  {
    code: "UP",
    name: "Uttar Pradesh",
    nameHi: "उत्तर प्रदेश",
    type: "STATE",
    totalSeats: 80,
    districts: [
      {
        name: "Varanasi",
        nameHi: "वाराणसी",
        constituencies: [
          {
            code: "PC02-UP",
            name: "Varanasi",
            nameHi: "वाराणसी",
            type: "PARLIAMENTARY",
            totalVoters: 1850000,
            pollingStations: [
              {
                stationCode: "ST-UP-01",
                name: "Central Hindu Boys School, Kamachha",
                nameHi: "सेंट्रल हिंदू बॉयज स्कूल, कामाच्छा",
                address: "Kamachha, Varanasi, Uttar Pradesh 221010",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Lucknow",
        nameHi: "लखनऊ",
        constituencies: [
          {
            code: "PC01-UP",
            name: "Lucknow",
            nameHi: "लखनऊ",
            type: "PARLIAMENTARY",
            totalVoters: 2040000,
            pollingStations: [
              {
                stationCode: "ST-UP-02",
                name: "Lucknow University Main Campus",
                nameHi: "लखनऊ विश्वविद्यालय",
                address: "Badshah Bagh, Lucknow 226007",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Gorakhpur",
        nameHi: "गोरखपुर",
        constituencies: [
          {
            code: "PC03-UP",
            name: "Gorakhpur",
            nameHi: "गोरखपुर",
            type: "PARLIAMENTARY",
            totalVoters: 1980000,
            pollingStations: [
              {
                stationCode: "ST-UP-03",
                name: "Deen Dayal Upadhyaya Gorakhpur University",
                nameHi: "दीनदयाल उपाध्याय गोरखपुर विश्वविद्यालय",
                address: "Civil Lines, Gorakhpur 273009",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 27. UTTARAKHAND
  {
    code: "UK",
    name: "Uttarakhand",
    nameHi: "उत्तराखंड",
    type: "STATE",
    totalSeats: 5,
    districts: [
      {
        name: "Dehradun",
        nameHi: "देहरादून",
        constituencies: [
          {
            code: "PC01-UK",
            name: "Tehri Garhwal",
            nameHi: "टिहरी गढ़वाल",
            type: "PARLIAMENTARY",
            totalVoters: 1520000,
            pollingStations: [
              {
                stationCode: "ST-UK-01",
                name: "DAV PG College, Dehradun",
                nameHi: "डीएवी पीजी कॉलेज, देहरादून",
                address: "Karanpur, Dehradun, Uttarakhand 248001",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Nainital",
        nameHi: "नैनीताल",
        constituencies: [
          {
            code: "PC02-UK",
            name: "Nainital-Udhamsingh Nagar",
            nameHi: "नैनीताल-ऊधमसिंह नगर",
            type: "PARLIAMENTARY",
            totalVoters: 1610000,
            pollingStations: [
              {
                stationCode: "ST-UK-02",
                name: "MB Govt PG College, Haldwani",
                nameHi: "एमबी सरकारी पीजी कॉलेज",
                address: "Haldwani 263139",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 28. WEST BENGAL
  {
    code: "WB",
    name: "West Bengal",
    nameHi: "पश्चिम बंगाल",
    type: "STATE",
    totalSeats: 42,
    districts: [
      {
        name: "Kolkata",
        nameHi: "कोलकाता",
        constituencies: [
          {
            code: "PC01-WB",
            name: "Kolkata Uttar",
            nameHi: "कोलकाता उत्तर",
            type: "PARLIAMENTARY",
            totalVoters: 1450000,
            pollingStations: [
              {
                stationCode: "ST-WB-01",
                name: "Scottish Church College",
                nameHi: "स्कॉटिश चर्च कॉलेज",
                address: "Hedua, Kolkata, West Bengal 700006",
                booths: [{ boothNumber: 1 }]
              }
            ]
          },
          {
            code: "PC02-WB",
            name: "Kolkata Dakshin",
            nameHi: "कोलकाता दक्षिण",
            type: "PARLIAMENTARY",
            totalVoters: 1720000,
            pollingStations: [
              {
                stationCode: "ST-WB-02",
                name: "Asutosh College, Hazra",
                nameHi: "आशुतोष कॉलेज, हाज़रा",
                address: "SP Mukherjee Road, Kolkata 700026",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Darjeeling",
        nameHi: "दार्जिलिंग",
        constituencies: [
          {
            code: "PC03-WB",
            name: "Darjeeling",
            nameHi: "दार्जिलिंग",
            type: "PARLIAMENTARY",
            totalVoters: 1610000,
            pollingStations: [
              {
                stationCode: "ST-WB-03",
                name: "St. Joseph's College, Darjeeling",
                nameHi: "सेंट जोसेफ कॉलेज, दार्जिलिंग",
                address: "North Point, Darjeeling 734104",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // ----------------------------------------------------
  // UNION TERRITORIES (8)
  // ----------------------------------------------------

  // 29. ANDAMAN AND NICOBAR ISLANDS (UT)
  {
    code: "AN",
    name: "Andaman and Nicobar Islands",
    nameHi: "अंडमान और निकोबार द्वीप समूह",
    type: "UNION_TERRITORY",
    totalSeats: 1,
    districts: [
      {
        name: "South Andaman",
        nameHi: "दक्षिण अंडमान",
        constituencies: [
          {
            code: "PC01-AN",
            name: "Andaman and Nicobar Islands",
            nameHi: "अंडमान और निकोबार द्वीप समूह",
            type: "PARLIAMENTARY",
            totalVoters: 318000,
            pollingStations: [
              {
                stationCode: "ST-AN-01",
                name: "Jawaharlal Nehru Rajkeeya Mahavidyalaya",
                nameHi: "जवाहरलाल नेहरू राजकीय महाविद्यालय",
                address: "Port Blair, Andaman & Nicobar 744104",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 30. CHANDIGARH (UT)
  {
    code: "CH",
    name: "Chandigarh",
    nameHi: "चंडीगढ़",
    type: "UNION_TERRITORY",
    totalSeats: 1,
    districts: [
      {
        name: "Chandigarh",
        nameHi: "चंडीगढ़",
        constituencies: [
          {
            code: "PC01-CH",
            name: "Chandigarh",
            nameHi: "चंडीगढ़",
            type: "PARLIAMENTARY",
            totalVoters: 640000,
            pollingStations: [
              {
                stationCode: "ST-CH-01",
                name: "DAV College Sector 10",
                nameHi: "डीएवी कॉलेज सेक्टर 10",
                address: "Sector 10, Chandigarh 160011",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 31. DADRA AND NAGAR HAVELI AND DAMAN AND DIU (UT)
  {
    code: "DN",
    name: "Dadra & Nagar Haveli and Daman & Diu",
    nameHi: "दादरा और नगर हवेली और दमन और दीव",
    type: "UNION_TERRITORY",
    totalSeats: 2,
    districts: [
      {
        name: "Daman",
        nameHi: "दमन",
        constituencies: [
          {
            code: "PC01-DN",
            name: "Daman and Diu",
            nameHi: "दमन और दीव",
            type: "PARLIAMENTARY",
            totalVoters: 130000,
            pollingStations: [
              {
                stationCode: "ST-DN-01",
                name: "Govt Higher Secondary School, Nani Daman",
                nameHi: "सरकारी उच्चतर माध्यमिक विद्यालय, नानी दमन",
                address: "Nani Daman 396210",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Dadra and Nagar Haveli",
        nameHi: "दादरा और नगर हवेली",
        constituencies: [
          {
            code: "PC02-DN",
            name: "Dadra and Nagar Haveli",
            nameHi: "दादरा और नगर हवेली",
            type: "PARLIAMENTARY",
            totalVoters: 250000,
            pollingStations: [
              {
                stationCode: "ST-DN-02",
                name: "Govt Higher Secondary School, Silvassa",
                nameHi: "सरकारी उच्चतर माध्यमिक विद्यालय, सिलवासा",
                address: "Silvassa 396230",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 32. DELHI (UT - NCT)
  {
    code: "DL",
    name: "Delhi",
    nameHi: "दिल्ली",
    type: "UNION_TERRITORY",
    totalSeats: 7,
    districts: [
      {
        name: "New Delhi",
        nameHi: "नई दिल्ली",
        constituencies: [
          {
            code: "PC04-DL",
            name: "New Delhi",
            nameHi: "नई दिल्ली",
            type: "PARLIAMENTARY",
            totalVoters: 1420000,
            pollingStations: [
              {
                stationCode: "ST-DL-01",
                name: "Modern School, Barakhamba Road",
                nameHi: "मॉडर्न स्कूल, बाराखंबा रोड",
                address: "Barakhamba Road, New Delhi 110001",
                booths: [{ boothNumber: 1 }, { boothNumber: 2 }]
              }
            ]
          }
        ]
      },
      {
        name: "South Delhi",
        nameHi: "दक्षिण दिल्ली",
        constituencies: [
          {
            code: "PC05-DL",
            name: "South Delhi",
            nameHi: "दक्षिण दिल्ली",
            type: "PARLIAMENTARY",
            totalVoters: 2060000,
            pollingStations: [
              {
                stationCode: "ST-DL-02",
                name: "IIT Delhi Main Academic Block",
                nameHi: "आईआईटी दिल्ली अकादमिक ब्लॉक",
                address: "Hauz Khas, New Delhi 110016",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "East Delhi",
        nameHi: "पूर्वी दिल्ली",
        constituencies: [
          {
            code: "PC06-DL",
            name: "East Delhi",
            nameHi: "पूर्वी दिल्ली",
            type: "PARLIAMENTARY",
            totalVoters: 2110000,
            pollingStations: [
              {
                stationCode: "ST-DL-03",
                name: "Maharaja Agrasen College, Vasundhara Enclave",
                nameHi: "महाराजा अग्रसेन कॉलेज",
                address: "Vasundhara Enclave, Delhi 110096",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 33. JAMMU AND KASHMIR (UT)
  {
    code: "JK",
    name: "Jammu and Kashmir",
    nameHi: "जम्मू और कश्मीर",
    type: "UNION_TERRITORY",
    totalSeats: 5,
    districts: [
      {
        name: "Srinagar",
        nameHi: "श्रीनगर",
        constituencies: [
          {
            code: "PC01-JK",
            name: "Srinagar",
            nameHi: "श्रीनगर",
            type: "PARLIAMENTARY",
            totalVoters: 1740000,
            pollingStations: [
              {
                stationCode: "ST-JK-01",
                name: "Amar Singh College, Gogji Bagh",
                nameHi: "अमर सिंह कॉलेज, गोगजी बाग",
                address: "Gogji Bagh, Srinagar, J&K 190008",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      },
      {
        name: "Jammu",
        nameHi: "जम्मू",
        constituencies: [
          {
            code: "PC02-JK",
            name: "Jammu",
            nameHi: "जम्मू",
            type: "PARLIAMENTARY",
            totalVoters: 1780000,
            pollingStations: [
              {
                stationCode: "ST-JK-02",
                name: "Govt MAM College, Jammu",
                nameHi: "सरकारी एमएएम कॉलेज, जम्मू",
                address: "University Road, Jammu 180006",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 34. LADAKH (UT)
  {
    code: "LA",
    name: "Ladakh",
    nameHi: "लद्दाख",
    type: "UNION_TERRITORY",
    totalSeats: 1,
    districts: [
      {
        name: "Leh",
        nameHi: "लेह",
        constituencies: [
          {
            code: "PC01-LA",
            name: "Ladakh",
            nameHi: "लद्दाख",
            type: "PARLIAMENTARY",
            totalVoters: 184000,
            pollingStations: [
              {
                stationCode: "ST-LA-01",
                name: "Eliezer Joldan Memorial College, Leh",
                nameHi: "ईजेएम कॉलेज, लेह",
                address: "Leh, Ladakh 194101",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 35. LAKSHADWEEP (UT)
  {
    code: "LD",
    name: "Lakshadweep",
    nameHi: "लक्षद्वीप",
    type: "UNION_TERRITORY",
    totalSeats: 1,
    districts: [
      {
        name: "Kavaratti",
        nameHi: "कवारत्ती",
        constituencies: [
          {
            code: "PC01-LD",
            name: "Lakshadweep",
            nameHi: "लक्षद्वीप",
            type: "PARLIAMENTARY",
            totalVoters: 57000,
            pollingStations: [
              {
                stationCode: "ST-LD-01",
                name: "Govt Senior Secondary School, Kavaratti",
                nameHi: "सरकारी सीनियर सेकेंडरी स्कूल, कवारत्ती",
                address: "Kavaratti, Lakshadweep 682555",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  },

  // 36. PUDUCHERRY (UT)
  {
    code: "PY",
    name: "Puducherry",
    nameHi: "पुडुचेरी",
    type: "UNION_TERRITORY",
    totalSeats: 1,
    districts: [
      {
        name: "Puducherry",
        nameHi: "पुडुचेरी",
        constituencies: [
          {
            code: "PC01-PY",
            name: "Puducherry",
            nameHi: "पुडुचेरी",
            type: "PARLIAMENTARY",
            totalVoters: 1020000,
            pollingStations: [
              {
                stationCode: "ST-PY-01",
                name: "Tagore Arts College, Lawspet",
                nameHi: "टैगोर आर्ट्स कॉलेज, लॉस्पेट",
                address: "Lawspet, Puducherry 605008",
                booths: [{ boothNumber: 1 }]
              }
            ]
          }
        ]
      }
    ]
  }
];
