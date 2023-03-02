export var ElectricityJSON = {
    "version" : "2022.10.01",
    "Residential": {
        "low pressure": {
            "stage1": 98.1,
            "stage2": 192.7,
            "stage3": 285.4,
            "super_summer": 714.3,
            "super_winter": 704.5,
            "basic1": 910,
            "basic2": 1600,
            "basic3": 7300
        },
        "high pressure": {
            "stage1": 83.1,
            "stage2": 152.1,
            "stage3": 220.4,
            "super_summer": 579.4,
            "super_winter": 579.4,
            "basic1": 730,
            "basic2": 1260,
            "basic3": 6060
        }
    },

    "Basic GAB 1": {
        "low pressure": {
            "basic": 6160,
            "summer": 110.5,
            "spring": 70.0,
            "winter": 97.1
        },
        "high pressure A": 
            {
                "select 1": {
                    "basic": 7170,
                    "summer": 120.7,
                    "spring": 76.7,
                    "winter": 108.4
                },
                "select 2": {
                    "basic": 8230,
                    "summer": 116.7,
                    "spring": 72.4,
                    "winter": 103.1
                }
            },
        "high pressure B": 
            {
                "select 1": {
                    "basic": 7170,
                    "summer": 118.6,
                    "spring": 75.6,
                    "winter": 105.4
                },
                "select 2": {
                    "basic": 8230,
                    "summer": 113.3,
                    "spring": 70.3,
                    "winter": 100.1
                }
            }
    },

    "Basic GAB 2": {
        "high pressure A": 
            {
                "select 1": {
                    "light": {
                        "basic": 7170,
                        "summer": 67.5,
                        "spring": 67.5,
                        "winter": 76.2
                    },
                    "medium": {
                        "basic": 7170,
                        "summer": 118.7,
                        "spring": 74.9,
                        "winter": 106.6
                        
                    },
                    "full": {
                        "basic": 7170,
                        "summer": 141.2,
                        "spring": 86.2,
                        "winter": 121.4
                    }
                },
                "select 2": {
                    "light": {
                        "basic": 8230,
                        "summer": 62.2,
                        "spring": 62.2,
                        "winter": 70.9
                    },
                    "medium": {
                        "basic": 8230,
                        "summer": 113.4,
                        "spring": 69.6,
                        "winter": 101.3
                        
                    },
                    "full": {
                        "basic": 8230,
                        "summer": 135.9,
                        "spring": 80.9,
                        "winter": 116.1
                    }
                }
            },

        "high pressure B": 
            {
                "select 1": {
                    "light": {
                        "basic": 7170,
                        "summer": 66.9,
                        "spring": 66.9,
                        "winter": 75.9
                    },
                    "medium": {
                        "basic": 7170,
                        "summer": 115.5,
                        "spring": 72.8,
                        "winter": 103.2
                        
                    },
                    "full": {
                        "basic": 7170,
                        "summer": 131.9,
                        "spring": 78.2,
                        "winter": 117.4
                    }
                },
                "select 2": {
                    "light": {
                        "basic": 8230,
                        "summer": 61.6,
                        "spring": 61.6,
                        "winter": 70.6
                    },
                    "medium": {
                        "basic": 8230,
                        "summer": 110.2,
                        "spring": 67.5,
                        "winter": 97.9
                        
                    },
                    "full": {
                        "basic": 8230,
                        "summer": 126.6,
                        "spring": 72.9,
                        "winter": 112.1
                    }
                }
            }
    },

    "Basic ULL": {
        "high pressure A": 
            {
                "select 1": {
                    "light": {
                        "basic": 7220,
                        "summer": 66.4,
                        "spring": 66.4,
                        "winter": 73.4
                    },
                    "medium": {
                        "basic": 7220,
                        "summer": 119.3,
                        "spring": 88.9,
                        "winter": 119.5
                        
                    },
                    "full": {
                        "basic": 7220,
                        "summer": 201.4,
                        "spring": 119.6,
                        "winter": 177.0
                    }
                },
                "select 2": {
                    "light": {
                        "basic": 8320,
                        "summer": 60.9,
                        "spring": 60.9,
                        "winter": 77.9
                    },
                    "medium": {
                        "basic": 8320,
                        "summer": 113.8,
                        "spring": 83.4,
                        "winter": 114.0
                        
                    },
                    "full": {
                        "basic": 8320,
                        "summer": 195.9,
                        "spring": 114.1,
                        "winter": 171.5
                    }
                },

                "select 3": {
                    "light": {
                        "basic": 9810,
                        "summer": 60.0,
                        "spring": 60.0,
                        "winter": 67.3
                    },
                    "medium": {
                        "basic": 9810,
                        "summer": 113.2,
                        "spring": 82.1,
                        "winter": 113.4
                        
                    },
                    "full": {
                        "basic": 9810,
                        "summer": 183.5,
                        "spring": 105.8,
                        "winter": 160.3
                    }
                }
            },
        "high pressure B": 
            {
                "select 1": {
                    "light": {
                        "basic": 6630,
                        "summer": 64.8,
                        "spring": 64.8,
                        "winter": 71.8
                    },
                    "medium": {
                        "basic": 6630,
                        "summer": 117.1,
                        "spring": 87.1,
                        "winter": 117.1
                        
                    },
                    "full": {
                        "basic": 6630,
                        "summer": 198.3,
                        "spring": 117.4,
                        "winter": 173.3
                    }
                },
                "select 2": {
                    "light": {
                        "basic": 7380,
                        "summer": 61.0,
                        "spring": 61.0,
                        "winter": 68.0
                    },
                    "medium": {
                        "basic": 7380,
                        "summer": 113.3,
                        "spring": 83.3,
                        "winter": 113.3
                        
                    },
                    "full": {
                        "basic": 7380,
                        "summer": 194.5,
                        "spring": 113.7,
                        "winter": 169.5
                    }
                },

                "select 3": {
                    "light": {
                        "basic": 8190,
                        "summer": 59.3,
                        "spring": 59.3,
                        "winter": 66.4
                    },
                    "medium": {
                        "basic": 8190,
                        "summer": 111.7,
                        "spring": 81.7,
                        "winter": 111.6
                        
                    },
                    "full": {
                        "basic": 8190,
                        "summer": 192.9,
                        "spring": 112.0,
                        "winter": 167.8
                    }
                }
            },
        "high pressure C": 
            {
                "select 1": {
                    "light": {
                        "basic": 6590,
                        "summer": 64.3,
                        "spring": 64.3,
                        "winter": 71.2
                    },
                    "medium": {
                        "basic": 6590,
                        "summer": 117.2,
                        "spring": 87.2,
                        "winter": 116.8
                        
                    },
                    "full": {
                        "basic": 6590,
                        "summer": 198.1,
                        "spring": 117.6,
                        "winter": 173.4
                    }
                },
                "select 2": {
                    "light": {
                        "basic": 7520,
                        "summer": 59.6,
                        "spring": 59.6,
                        "winter": 66.5
                    },
                    "medium": {
                        "basic": 7520,
                        "summer": 112.5,
                        "spring": 82.5,
                        "winter": 112.1
                        
                    },
                    "full": {
                        "basic": 7520,
                        "summer": 193.4,
                        "spring": 112.9,
                        "winter": 168.7
                    }
                },

                "select 3": {
                    "light": {
                        "basic": 8090,
                        "summer": 58.5,
                        "spring": 58.5,
                        "winter": 65.4
                    },
                    "medium": {
                        "basic": 8090,
                        "summer": 111.4,
                        "spring": 81.4,
                        "winter": 111.0
                        
                    },
                    "full": {
                        "basic": 8090,
                        "summer": 192.3,
                        "spring": 111.8,
                        "winter": 167.6
                    }
                }
            }

    }
}