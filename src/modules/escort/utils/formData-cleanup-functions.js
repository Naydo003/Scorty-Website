
export function isMeetsWithDirty(dirtyFieldsMeetsWith, formDataMeetsWith, meetsWithInitials) {
    if (dirtyFieldsMeetsWith){
      return true
    } else {

      let isMeetsWithDirty = formDataMeetsWith.reduce((state, mwo) => {
        let [key] = Object.keys(mwo)
        if (mwo[key] != meetsWithInitials[key]){
          console.log(key, 'is different')
          return state = true
        } else {
          return state
        }
      }, false)

      if (isMeetsWithDirty) {
        return true
      }
    }
    return false
}

export function isActivitiesDirty(dirtyFields, formData, initials) {
    if (dirtyFields){
      return true
    } else {

      let isDirty = formData.reduce((state, act) => {
        let [key] = Object.keys(act)
        if (act[key] != initials[key]){
          console.log(key, 'is different')
          return state = true
        } else {
          return state
        }
      }, false)

      if (isDirty) {
        return true
      }
    }
    return false
}

export function isLinksDirty(dirtyFields, formData, initials) {

  if (dirtyFields){
    return true
  } else {

    let isDirty = formData.reduce((state, link, index) => {
      if (!initials[index] || link.linkMedia != initials[index].linkMedia){
        console.log(link.linkMedia, 'is different')
        return state = true
      } else if (!initials[index] || link.linkUrl != initials[index].linkUrl) {
        return state = true
      } else {
        return state
      }
    }, false)

    if (isDirty) {
      return true
    }
  }
  return false
}


export function modifyUnpairedQuestions(formData, updateData) {
  if (updateData.question1 && !formData.answer1) {
    updateData.question1 = 'none'
  }
  if (updateData.question2 && !formData.answer2) {
    updateData.question2 = 'none'
  }
  if (updateData.question3 && !formData.answer3) {
    updateData.question3 = 'none'
  }
  if (updateData.answer1 && !formData.question1) {
    updateData.answer1 = null
  }
  if (updateData.answer2 && !formData.question2) {
    updateData.answer2 = null
  }
  if (updateData.answer3 && !formData.question3) {
    updateData.answer3 = null
  }
  return updateData
}

export function deleteIncompleteLinks(updateDataLinks) {
      // loops through links object and deletes any that have empty or null values.
      console.log('running')
      console.log(updateDataLinks)

      updateDataLinks.forEach((link, idx) => {
        console.log(link)
        if ( link.linkMedia === '' || link.linkUrl === '' || link.linkMedia === null || link.linkUrl === null ) {
        // delete formData.links[link]
        updateDataLinks.splice(idx, 1)
        }
      })
      console.log(updateDataLinks)
      return JSON.parse(JSON.stringify(updateDataLinks))
}

export function isPricesDirty(dirtyFields, formData, initials) {

  if (dirtyFields){
    console.log('prices in dirtyfields')
    return true
  } else {

    let isDirty = formData.reduce((state, price, index) => {
      if (!initials[index] || price.time != initials[index].time){
        console.log(price.time, 'is different')
        return state = true
      } else if (!initials[index] || price.price != initials[index].price) {
        return state = true
      } else if (!initials[index] || price.includesInfo != initials[index].includesInfo) {
        return state = true
      } else {
        return state
      }
    }, false)

    if (isDirty) {
      return true
    }
  }
  return false
}