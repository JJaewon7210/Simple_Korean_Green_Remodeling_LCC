export var TechnologyJSON = {
  "외벽": {
    "고효율 단열 복합시스템": {
      "initial unit price": 250000,
      "unit": "wall area",
      "repair ratio": 0.2,
      "repair cycle": 15,
      "replacement cycle": 50
    },
    "외단열": {
      "initial unit price": 241925,
      "unit": "wall area",
      "repair ratio": 0.2,
      "repair cycle": 15,
      "replacement cycle": 50
    },

    "내단열": {
      "initial unit price": 58600,
      "unit": "wall area",
      "repair ratio": 0.2,
      "repair cycle": 15,
      "replacement cycle": 50
    },
    "바닥난방": {
      "initial unit price": 85000,
      "unit": "floor area",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 25
    },
    "프리패브 외단열": { //기술패키지
      "cls": "기술패키지",
      "initial unit price": 0,
      "unit": "wall area",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 25
    }
  },
  "창호": {
    "고효율 패시브 창호시스템": {
      "initial unit price": 360000,
      "unit": "window area",
      "repair ratio": 0.2,
      "repair cycle": 10,
      "replacement cycle": 20
    },
    "창호교체": {
      "initial unit price": 551443,
      "unit": "window area",
      "repair ratio": 0.2,
      "repair cycle": 10,
      "replacement cycle": 20
    },
    "외부차양 시스템": {
      "initial unit price": 360000,
      "unit": "window area",
      "repair ratio": 0.2,
      "repair cycle": 10,
      "replacement cycle": 20
    },
    "PVC": {
      "initial unit price": 384400,
      "unit": "window area",
      "repair ratio": 0.1,
      "repair cycle": 10,
      "replacement cycle": 30
    },
    "알루미늄": {
      "initial unit price": 326500,
      "unit": "window area",
      "repair ratio": 0.1,
      "repair cycle": 10,
      "replacement cycle": 25
    },
    "구조체 보수": {
      "initial unit price": 20000,
      "unit": "window area",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 3
    },
    "일사조절장치": {
      "initial unit price": 202000,
      "unit": "window area",
      "repair ratio": 0.2,
      "repair cycle": 10,
      "replacement cycle": 20
    },
    "Cool roof": {
      "initial unit price": 74072,
      "unit": "rooftop area",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 10
    },
    "고효율 창호": { //기술패키지
      "cls": "기술패키지",
      "initial unit price": 0,
      "unit": "window area",
      "repair ratio": 20,
      "repair cycle": 10,
      "replacement cycle": 30
    }
  },
  "공조": {
    "고효율 공조시스템": {
      "initial unit price": 36000,
      "unit": "Room area",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 10
    },
    "폐열회수 환기시스템": {
      "initial unit price": 36000,
      "unit": "Room area",
      "repair ratio": 0.092307,
      "repair cycle": 2,
      "replacement cycle": 15
    },
    "복합환기유니트": {
      "initial unit price": 36000,
      "unit": "Room area",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 10
    },
    "폐열회수형 환기장치": {
      "initial unit price": 36000,
      "unit": "Room area",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 10
    }
  },
  "냉난방": {
    "고효율열공급분배복합시스템": {
      "initial unit price": 99000,
      "unit": "",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 10
    },
    "개별 EHP": {
      "initial unit price": 99000,
      "unit": "Room area",
      "repair ratio": 0.00665536,
      "repair cycle": 1,
      "replacement cycle": 20
    },
    "중앙방식 냉동기": {
      "initial unit price": 901800,
      "unit": "device capacity",
      "repair ratio": 1,
      "repair cycle": 1,
      "replacement cycle": 15
    },
    "중앙방식 펌프류": {
      "initial unit price": 116800,
      "unit": "device capacity",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 10
    },
    "가정용 보일러": {
      "initial unit price": 48,
      "unit": "device capacity",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 15
    },
    "중앙식 보일러": {
      "initial unit price": 187,
      "unit": "device capacity",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 15
    }
  },
  "조명": {
    "고효율 LED 조명 및 제어시스템": {
      "initial unit price": 172838,
      "unit": "EA",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 20
    },
    "고효율 조명": {
      "initial unit price": 172838,
      "unit": "EA",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 20
    }
  },
  "전기": {
    "고효율 전력제어시스템": {
      "initial unit price": 200000,
      "unit": "",
      "repair ratio": 0.1,
      "repair cycle": 10,
      "replacement cycle": 20
    },
    "고효율 전력회생시스템": {
      "initial unit price": 200000,
      "unit": "",
      "repair ratio": 0.1,
      "repair cycle": 10,
      "replacement cycle": 20
    }
  },
  "신재생": {
    "BIPV+PV+ESS 하이브리드 시스템": {
      "initial unit price": 5931.900,
      "unit": "kW",
      "repair ratio": 0.0092,
      "repair cycle": 1,
      "replacement cycle": 25
    },
    "BEMS 설치": {
      "initial unit price": 19771,
      "unit": "Total floor area",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 20
    }
  },
  "기타": {
    "스마트배선시스템": { //기술패키지
      "cls": "기술패키지",
      "initial unit price": 0,
      "unit": "floor area",
      "repair ratio": 0,
      "repair cycle": 0,
      "replacement cycle": 20
    },
    "단열방화도어": { //기술패키지
      "cls": "기술패키지",
      "initial unit price": 0,
      "unit": "EA",
      "repair ratio": 20,
      "repair cycle": 10,
      "replacement cycle": 30
    },
    "옥상 외단열": { //기술패키지
      "cls": "기술패키지",
      "initial unit price": 0,
      "unit": "EA",
      "repair ratio": 20,
      "repair cycle": 15,
      "replacement cycle": 50
    }
  }
}