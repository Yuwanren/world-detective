import type { Locale } from '../types/index.ts'

export type AnswerPrompt =
  | { kind: 'choices'; options: Record<Locale, readonly string[]> }
  | { kind: 'suggestions'; options: Record<Locale, readonly string[]> }

const choices = (en: readonly string[], zh: readonly string[]): AnswerPrompt => ({
  kind: 'choices',
  options: { en, zh },
})

const suggestions = (en: readonly string[], zh: readonly string[]): AnswerPrompt => ({
  kind: 'suggestions',
  options: { en, zh },
})

// Hand-checked prompts. Distractors are written here; they are not inferred from category.
export const answerPrompts: Record<string, AnswerPrompt> = {
  japan: choices(['Japan', 'South Korea', 'Thailand', 'Vietnam'], ['日本', '韩国', '泰国', '越南']),
  france: choices(['France', 'Spain', 'Italy', 'Belgium'], ['法国', '西班牙', '意大利', '比利时']),
  egypt: choices(['Egypt', 'Tunisia', 'Sudan', 'Libya'], ['埃及', '突尼斯', '苏丹', '利比亚']),
  brazil: choices(['Brazil', 'Argentina', 'Colombia', 'Peru'], ['巴西', '阿根廷', '哥伦比亚', '秘鲁']),
  canada: choices(['Canada', 'United States', 'Mexico', 'Greenland'], ['加拿大', '美国', '墨西哥', '格陵兰']),
  kenya: choices(['Kenya', 'Tanzania', 'Ethiopia', 'Uganda'], ['肯尼亚', '坦桑尼亚', '埃塞俄比亚', '乌干达']),
  norway: choices(['Norway', 'Sweden', 'Finland', 'Iceland'], ['挪威', '瑞典', '芬兰', '冰岛']),
  australia: choices(['Australia', 'New Zealand', 'Indonesia', 'Fiji'], ['澳大利亚', '新西兰', '印度尼西亚', '斐济']),
  india: choices(['India', 'Pakistan', 'Bangladesh', 'Nepal'], ['印度', '巴基斯坦', '孟加拉国', '尼泊尔']),
  mexico: choices(['Mexico', 'Guatemala', 'Cuba', 'Colombia'], ['墨西哥', '危地马拉', '古巴', '哥伦比亚']),
  morocco: choices(['Morocco', 'Algeria', 'Tunisia', 'Portugal'], ['摩洛哥', '阿尔及利亚', '突尼斯', '葡萄牙']),
  greece: choices(['Greece', 'Portugal', 'Croatia', 'Turkey'], ['希腊', '葡萄牙', '克罗地亚', '土耳其']),
  paris: suggestions(
    ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Nantes'],
    ['巴黎', '里昂', '马赛', '图卢兹', '波尔多', '南特'],
  ),
  kyoto: suggestions(
    ['Kyoto', 'Osaka', 'Tokyo', 'Nara', 'Kanazawa', 'Hiroshima'],
    ['京都', '大阪', '东京', '奈良', '金泽', '广岛'],
  ),
  'new-york': suggestions(
    ['New York', 'Chicago', 'Los Angeles', 'Boston', 'Miami', 'Seattle'],
    ['纽约', '芝加哥', '洛杉矶', '波士顿', '迈阿密', '西雅图'],
  ),
  venice: suggestions(
    ['Venice', 'Florence', 'Milan', 'Rome', 'Naples', 'Bologna'],
    ['威尼斯', '佛罗伦萨', '米兰', '罗马', '那不勒斯', '博洛尼亚'],
  ),
  reykjavik: suggestions(
    ['Reykjavik', 'Oslo', 'Helsinki', 'Bergen', 'Tromso', 'Akureyri'],
    ['雷克雅未克', '奥斯陆', '赫尔辛基', '卑尔根', '特罗姆瑟', '阿克雷里'],
  ),
  'cape-town': suggestions(
    ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Nairobi', 'Windhoek'],
    ['开普敦', '约翰内斯堡', '德班', '比勒陀利亚', '内罗毕', '温得和克'],
  ),
  london: suggestions(
    ['London', 'Manchester', 'Edinburgh', 'Dublin', 'Birmingham', 'Liverpool'],
    ['伦敦', '曼彻斯特', '爱丁堡', '都柏林', '伯明翰', '利物浦'],
  ),
  'eiffel-tower': choices(
    ['Eiffel Tower', 'Arc de Triomphe', 'Notre-Dame', 'Sacré-Cœur'],
    ['埃菲尔铁塔', '凯旋门', '巴黎圣母院', '圣心大教堂'],
  ),
  'machu-picchu': choices(
    ['Machu Picchu', 'Chichen Itza', 'Teotihuacan', 'Tikal'],
    ['马丘比丘', '奇琴伊察', '特奥蒂瓦坎', '蒂卡尔'],
  ),
  'great-wall': choices(
    ['Great Wall', 'Forbidden City', 'Terracotta Army', 'Summer Palace'],
    ['长城', '故宫', '兵马俑', '颐和园'],
  ),
  colosseum: choices(
    ['Colosseum', 'Pantheon', 'Trevi Fountain', 'Pompeii'],
    ['罗马斗兽场', '万神殿', '特莱维喷泉', '庞贝'],
  ),
  petra: choices(
    ['Petra', 'Palmyra', 'Baalbek', 'Persepolis'],
    ['佩特拉', '帕尔米拉', '巴勒贝克', '波斯波利斯'],
  ),
  'statue-of-liberty': choices(
    ['Statue of Liberty', 'Mount Rushmore', 'Lincoln Memorial', 'Golden Gate Bridge'],
    ['自由女神像', '拉什莫尔山', '林肯纪念堂', '金门大桥'],
  ),
  'sydney-opera-house': choices(
    ['Sydney Opera House', 'Harbour Bridge', 'The Shard', 'Burj Khalifa'],
    ['悉尼歌剧院', '海港大桥', '碎片大厦', '哈利法塔'],
  ),
  peru: choices(['Peru', 'Bolivia', 'Ecuador', 'Chile'], ['秘鲁', '玻利维亚', '厄瓜多尔', '智利']),
  'south-korea': choices(['South Korea', 'North Korea', 'Japan', 'Taiwan'], ['韩国', '朝鲜', '日本', '台湾']),
  argentina: choices(['Argentina', 'Uruguay', 'Paraguay', 'Brazil'], ['阿根廷', '乌拉圭', '巴拉圭', '巴西']),
  thailand: choices(['Thailand', 'Cambodia', 'Vietnam', 'Malaysia'], ['泰国', '柬埔寨', '越南', '马来西亚']),
  switzerland: choices(['Switzerland', 'Austria', 'Belgium', 'Luxembourg'], ['瑞士', '奥地利', '比利时', '卢森堡']),
  'new-delhi': suggestions(
    ['New Delhi', 'Mumbai', 'Jaipur', 'Kathmandu', 'Dhaka', 'Islamabad'],
    ['新德里', '孟买', '斋浦尔', '加德满都', '达卡', '伊斯兰堡'],
  ),
  istanbul: suggestions(
    ['Istanbul', 'Ankara', 'Izmir', 'Athens', 'Bursa', 'Sofia'],
    ['伊斯坦布尔', '安卡拉', '伊兹密尔', '雅典', '布尔萨', '索非亚'],
  ),
  lisbon: suggestions(
    ['Lisbon', 'Porto', 'Madrid', 'Seville', 'Faro', 'Barcelona'],
    ['里斯本', '波尔图', '马德里', '塞维利亚', '法鲁', '巴塞罗那'],
  ),
  marrakech: suggestions(
    ['Marrakech', 'Casablanca', 'Rabat', 'Fez', 'Tangier', 'Agadir'],
    ['马拉喀什', '卡萨布兰卡', '拉巴特', '非斯', '丹吉尔', '阿加迪尔'],
  ),
  vancouver: suggestions(
    ['Vancouver', 'Victoria', 'Calgary', 'Seattle', 'Toronto', 'Portland'],
    ['温哥华', '维多利亚', '卡尔加里', '西雅图', '多伦多', '波特兰'],
  ),
  dubai: suggestions(
    ['Dubai', 'Abu Dhabi', 'Doha', 'Muscat', 'Manama', 'Riyadh'],
    ['迪拜', '阿布扎比', '多哈', '马斯喀特', '麦纳麦', '利雅得'],
  ),
  'angkor-wat': choices(['Angkor Wat', 'Borobudur', 'Bagan', 'Prambanan'], ['吴哥窟', '婆罗浮屠', '蒲甘古城', '普兰巴南寺庙群']),
  'christ-the-redeemer': choices(
    ['Christ the Redeemer', 'Sugarloaf Mountain', 'Statue of Liberty', 'Great Sphinx of Giza'],
    ['救世基督像', '面包山', '自由女神像', '吉萨狮身人面像'],
  ),
  'mount-fuji': choices(['Mount Fuji', 'Mount Aso', 'Mount Haku', 'Mount Ontake'], ['富士山', '阿苏山', '白山', '御岳山']),
  'sagrada-familia': choices(
    ['Sagrada Família', 'Casa Batlló', 'Milan Cathedral', 'Seville Cathedral'],
    ['圣家堂', '巴特罗之家', '米兰大教堂', '塞维利亚大教堂'],
  ),
  'burj-khalifa': choices(
    ['Burj Khalifa', 'Shanghai Tower', 'Merdeka 118', 'One World Trade Center'],
    ['哈利法塔', '上海中心大厦', '默迪卡118大厦', '纽约世贸中心一号楼'],
  ),
  'chichen-itza': choices(['Chichen Itza', 'Teotihuacan', 'Tikal', 'Palenque'], ['奇琴伊察', '特奥蒂瓦坎', '蒂卡尔', '帕伦克']),
  'table-mountain': choices(['Table Mountain', "Lion's Head", 'Signal Hill', 'Drakensberg'], ['桌山', '狮头山', '信号山', '德拉肯斯山脉']),
  'moai-statues': choices(
    ['Moai statues', 'Nazca Lines', 'Olmec colossal heads', 'Terracotta Army'],
    ['摩艾石像', '纳斯卡线条', '奥尔梅克巨型头像', '秦始皇兵马俑'],
  ),
  'neuschwanstein-castle': choices(
    ['Neuschwanstein Castle', 'Hohenzollern Castle', 'Heidelberg Castle', 'Wartburg Castle'],
    ['新天鹅堡', '霍亨索伦城堡', '海德堡城堡', '瓦特堡城堡'],
  ),
  'iguazu-falls': choices(
    ['Iguazu Falls', 'Victoria Falls', 'Niagara Falls', 'Kaieteur Falls'],
    ['伊瓜苏瀑布', '维多利亚瀑布', '尼亚加拉瀑布', '凯厄图尔瀑布'],
  ),
  'potala-palace': choices(
    ['Potala Palace', 'Jokhang Temple', 'Forbidden City', 'Tashilhunpo Monastery'],
    ['布达拉宫', '大昭寺', '故宫', '扎什伦布寺'],
  ),
  indonesia: choices(
    ['Indonesia', 'Philippines', 'Malaysia', 'Papua New Guinea'],
    ['印度尼西亚', '菲律宾', '马来西亚', '巴布亚新几内亚'],
  ),
  iceland: choices(['Iceland', 'Ireland', 'Norway', 'Faroe Islands'], ['冰岛', '爱尔兰', '挪威', '法罗群岛']),
  'new-zealand': choices(
    ['New Zealand', 'Australia', 'Fiji', 'Papua New Guinea'],
    ['新西兰', '澳大利亚', '斐济', '巴布亚新几内亚'],
  ),
  ethiopia: choices(['Ethiopia', 'Eritrea', 'Kenya', 'Sudan'], ['埃塞俄比亚', '厄立特里亚', '肯尼亚', '苏丹']),
  croatia: choices(['Croatia', 'Slovenia', 'Montenegro', 'Albania'], ['克罗地亚', '斯洛文尼亚', '黑山', '阿尔巴尼亚']),
  seoul: suggestions(
    ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Tokyo', 'Taipei'],
    ['首尔', '釜山', '仁川', '大邱', '东京', '台北'],
  ),
  cairo: suggestions(
    ['Cairo', 'Alexandria', 'Luxor', 'Amman', 'Tunis', 'Khartoum'],
    ['开罗', '亚历山大', '卢克索', '安曼', '突尼斯市', '喀土穆'],
  ),
  prague: suggestions(
    ['Prague', 'Vienna', 'Budapest', 'Bratislava', 'Krakow', 'Munich'],
    ['布拉格', '维也纳', '布达佩斯', '布拉迪斯拉发', '克拉科夫', '慕尼黑'],
  ),
  cusco: suggestions(['Cusco', 'Arequipa', 'Puno', 'La Paz', 'Quito', 'Sucre'], ['库斯科', '阿雷基帕', '普诺', '拉巴斯', '基多', '苏克雷']),
  kyiv: suggestions(['Kyiv', 'Lviv', 'Odesa', 'Minsk', 'Warsaw', 'Chisinau'], ['基辅', '利沃夫', '敖德萨', '明斯克', '华沙', '基希讷乌']),
  'golden-gate-bridge': choices(
    ['Golden Gate Bridge', 'Brooklyn Bridge', 'Bay Bridge', 'Tower Bridge'],
    ['金门大桥', '布鲁克林大桥', '海湾大桥', '伦敦塔桥'],
  ),
  'acropolis-of-athens': choices(
    ['Acropolis of Athens', 'Delphi', 'Temple of Apollo at Bassae', 'Knossos Palace'],
    ['雅典卫城', '德尔斐遗址', '巴塞的阿波罗神庙', '克诺索斯宫殿'],
  ),
  'pyramids-of-giza': choices(
    ['Pyramids of Giza', 'Pyramids of Meroe', 'Step Pyramid of Djoser', 'Teotihuacan pyramids'],
    ['吉萨金字塔群', '麦罗埃金字塔群', '左塞尔阶梯金字塔', '特奥蒂瓦坎金字塔群'],
  ),
  stonehenge: choices(
    ['Stonehenge', 'Avebury Stone Circle', 'Callanish Standing Stones', 'Carnac Stones'],
    ['巨石阵', '埃夫伯里石圈', '卡拉尼什立石群', '卡纳克巨石群'],
  ),
  'burj-al-arab': choices(
    ['Burj Al Arab', 'Atlantis The Palm', 'Emirates Palace', 'Marina Bay Sands'],
    ['帆船酒店', '亚特兰蒂斯棕榈岛酒店', '酋长皇宫酒店', '滨海湾金沙酒店'],
  ),
  'sydney-harbour-bridge': choices(
    ['Sydney Harbour Bridge', 'Story Bridge', 'Auckland Harbour Bridge', 'Clifton Suspension Bridge'],
    ['悉尼海港大桥', '故事桥', '奥克兰海港大桥', '克利夫顿悬索桥'],
  ),
  'petronas-towers': choices(
    ['Petronas Twin Towers', 'Shanghai World Financial Center', 'Taipei 101', 'Abraj Al Bait'],
    ['吉隆坡双子塔', '上海环球金融中心', '台北101', '麦加皇家钟塔'],
  ),
  'leaning-tower-of-pisa': choices(
    ['Leaning Tower of Pisa', 'Torre degli Asinelli', 'Leaning Tower of Suurhusen', "Campanile of St Mark's"],
    ['比萨斜塔', '阿西内利塔', '苏尔胡森斜塔', '圣马可钟楼'],
  ),
  'mount-kilimanjaro': choices(
    ['Mount Kilimanjaro', 'Mount Kenya', 'Mount Elgon', 'Mount Meru'],
    ['乞力马扎罗山', '肯尼亚山', '埃尔贡山', '梅鲁山'],
  ),
  'mount-rushmore': choices(
    ['Mount Rushmore', 'Crazy Horse Memorial', 'Lincoln Memorial', 'Jefferson Memorial'],
    ['总统山', '疯马纪念雕像', '林肯纪念堂', '杰斐逊纪念堂'],
  ),
  'forbidden-city': choices(
    ['Forbidden City', 'Summer Palace', 'Temple of Heaven', 'Potala Palace'],
    ['故宫', '颐和园', '天坛', '布达拉宫'],
  ),
  alhambra: choices(
    ['Alhambra', 'Alcazar of Seville', 'Mezquita of Cordoba', 'Royal Palace of Madrid'],
    ['阿尔罕布拉宫', '塞维利亚王宫', '科尔多瓦清真寺主教座堂', '马德里王宫'],
  ),
  'brandenburg-gate': choices(
    ['Brandenburg Gate', 'Arc de Triomphe', 'India Gate', 'Gateway of India'],
    ['勃兰登堡门', '凯旋门', '印度门', '印度门户'],
  ),
}
