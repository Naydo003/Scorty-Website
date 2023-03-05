function titleMapBuilder(list) {
  let titleKeyObjectBuilder = {}
  list.forEach(entry => {
  titleKeyObjectBuilder[entry.name] = entry.title
  })
  return titleKeyObjectBuilder
}

function checkboxInitialStateBuilder(list) {
  let objectBuilder = {}
  list.forEach(entry => (objectBuilder[entry.name] = false) ) 
  return objectBuilder
}

export const questions = [
  { name: 'none', title: 'none' },
  { name: 'q1', title: 'What song do you fuck to?' },
  { name: 'q2', title: 'Tits or Ass?' },
  { name: 'q3', title: 'Ideal Sugar Daddy?' },
]

export const questionsTitleMap = titleMapBuilder(questions)

export const linkMedia = [
  {name: 'noneSelected', title: ''},
  {name: 'twitter', title: 'Twitter'},
  {name: 'instagram', title: 'Instagram'},
  {name: 'website', title: 'Website'},
  {name: 'snapchat', title: 'Snapchat'},
  {name: 'onlyfans', title: 'Onlyfans'},
  {name: 'linktree', title: 'LinkTree'},
  {name: 'fansly', title: 'Fansly'},
  {name: 'wishlist', title: 'Wishlist'}
]

export const linkMediaTitleMap = titleMapBuilder(linkMedia)

export const bodyShape = [
  { name: 'noneSelected', title: '' },
  { name: 'petite', title: 'Petite' },
  { name: 'athletic', title: 'Athletic' },
  { name: 'average', title: 'Average' },
  { name: 'curvy', title: 'Curvy' },
  { name: 'aFewExtraPounds', title: 'A Few Extra Pounds' },
  { name: 'bbw', title: 'BBW' },
]

export const bodyShapeTitleMap = titleMapBuilder(bodyShape)

export const ethnicity = [
  { name: 'noneSelected', title: '' },
  { name: 'asian', title: 'Asian' },
  { name: 'southAsian', title: 'South East Asian' },
  { name: 'black', title: 'Black / African Decent' },
  { name: 'latin', title: 'Latin' },
  { name: 'eastIndian', title: 'East Indian' },
  { name: 'middleEastern', title: 'Middle Eastern / Arabic' },
  { name: 'nativeAmerican', title: 'Native American' },
  { name: 'aboriginalOrTSIslander', title: 'Aboriginal or Torres Strait Islander' },
  { name: 'maori', title: 'Maori' },
  { name: 'pacificIslander', title: 'Pacific Islander' },
  { name: 'whiteCaucasian', title: 'White / Caucasian' },
  { name: 'european', title: 'Eastern European' },
  { name: 'caribean', title: 'Caribean' },
]

export const ethnicityTitleMap = titleMapBuilder(ethnicity)

export const education = [
  { name: 'noneSelected', title: '' },
  { name: 'highSchool', title: 'High School' },
  { name: 'studying', title: 'Studying'},
  { name: 'university', title: 'Finished University'},
]

export const educationTitleMap = titleMapBuilder(education)

export const hairColour = [
  { name: 'noneSelected', title: '' },
  { name: 'blonde', title: 'Blonde' },
  { name: 'brunette', title: 'Brunette' },
  { name: 'black', title: 'Black' },
  { name: 'red', title: 'Red' },
  { name: 'grey', title: 'Grey' },
  { name: 'other', title: 'Other' },
]

export const eyeColour = [
  { name: 'noneSelected', title: '' },
  { name: 'green', title: 'Green'},
  { name: 'hazel', title: 'Hazel'},
  { name: 'brown', title: 'Brown'},
  { name: 'blue', title: 'Blue'},
]

export const eyeColourTitleMap = titleMapBuilder(eyeColour)

export const pubicHair = [
  { name: 'noneSelected', title: '' },
  { name: 'shaved', title: 'Clean Shaved' },
  { name: 'trimmed', title: 'Trimmed' },
  { name: 'natural', title: 'Natural' },
]

export const pubicHairTitleMap = titleMapBuilder(pubicHair)

export const smoker = [
  { name: 'noneSelected', title: '' },
  { name: 'nonSmoker', title: 'Non-Smoker' },
  { name: 'socially', title: 'I only smoke on occasions' },
  { name: 'yesSmoker', title: 'Yes' },
]

export const smokerTitleMap = titleMapBuilder(smoker)

export const drinker = [
  { name: 'noneSelected', title: '' },
  { name: 'nonDrinker', title: "No, sorry I don't drink" },
  { name: 'occasionalDrinker', title: 'I will enjoy a glass or two on occasions' },
  { name: 'happyDrinker', title: 'I love a drink' },
]

export const drinkerTitleMap = titleMapBuilder(drinker)


export const meetsWithOptions = [
  { name: 'men', title: 'Men' },
  { name: 'women', title: 'Women' },
  { name: 'mfcouples', title: 'Male-Female Couples' },
  { name: 'mmcouples', title: 'Male-Male Couples' },
  { name: 'groupSex', title: 'Group Sex' },
  { name: 'swingersParties', title: 'Swingers Parties' },
  { name: 'publicfunctions', title: 'Public Functions' },
  { name: 'privateEvents', title: 'Private Events' },
  { name: 'disabled', title: 'People with Disabilities' },
  { name: 'transexuals', title: 'Transexuals' },
]

export const meetsWithOptionsTitleMap = titleMapBuilder(meetsWithOptions)
export const meetsWithOptionsInitialState = checkboxInitialStateBuilder(meetsWithOptions)

export const specialCategory = [
  { name: 'none', title: 'No special categories'},
  { name: 'dominatrixMistress', title: 'Dominatrix/Mistress', description: 'You provide the BDSM service of being a dominatrix or Mistress'},
  { name: 'hotwife', title: 'Hot Wife', description: 'You are in a commited relationship and wish to make it known'},
  { name: 'onlineOnly', title: 'Online Only', description: 'You do not provide any inperson services, only video calls etc.'},
  { name: 'couple', title: 'Couple', description: 'You escort as a couple. We are particularly advertising people in a relationship here. Not escorts working together'},
  { name: 'massageOnly', title: 'Massage Only', description: 'You provide services with your hands only. There will be no sexual acts performed on you'},
  { name: 'pornActress', title: 'Porn Actress', description: 'You star in adult films and want that advertised. This may include onlyfans.'},
  { name: 'sugarBaby', title: 'Sugar Baby', description: 'You are looking for an ongoing arrangement only. Not PPM'},
  { name: 'maleEscort', title: 'Male Escort', description: ''},
  { name: 'trans', title: 'Trans', description: ''},
]

export const specialCategoryTitleMap = titleMapBuilder(specialCategory)


export const escortActivities = [
  { name: 'blowjob', title: 'Blowjob' },
  { name: 'anal', title: 'Anal' },
  { name: 'squirting', title: 'Squirting' },
  { name: 'schoolGirlUniform', title: 'School Girl Uniform' },
  { name: 'peeingYou', title: 'Peeing On You' }
]

export const escortActivitiesTitleMap = titleMapBuilder(escortActivities)
export const escortActivitiesInitialState = checkboxInitialStateBuilder(escortActivities)


export const contactMethod = [
  { name: 'call', title: 'Call' },
  { name: 'text', title: 'Text' },
  { name: 'whatsApp', title: 'WhatsApp' },
  { name: 'email', title: 'Email' },
  { name: 'ourMessagingService', title: 'Using The App' },
]

export const contactMethodTitleMap = titleMapBuilder(contactMethod)

export const timeframe = [
  { name: 'noneSelected', title: 'Select One' },
  { name: 'mins15', title: '15 minutes' },
  { name: 'mins30', title: '30 minutes' },
  { name: 'hour1', title: '1 hour' },
  { name: 'mins90', title: '1.5 hours' },
  { name: 'hours2', title: '2 hours' },
  { name: 'hours3', title: '3 hours' },
  { name: 'hours4', title: '4 hours' },
  { name: 'hours5', title: '5 hours' },
  { name: 'hours6', title: '6 hours' },
  { name: 'hours7', title: '7 hours' },
  { name: 'hours8', title: '8 hours' },
  { name: 'hours10', title: '10 hours' },
  { name: 'hours12', title: '12 hours' },
  { name: 'additionalHour', title: 'Additional Hour' },
  { name: 'overnight', title: 'Overnight' },
  { name: 'day', title: 'Day' },
  { name: 'extra', title: 'Extra' },
  { name: 'other', title: 'Other' },
]

export const timeframeTitleMap = titleMapBuilder(timeframe)
