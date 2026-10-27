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
}
