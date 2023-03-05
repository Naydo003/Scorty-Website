-- AlterTable
ALTER TABLE `Escort` MODIFY `bodyShape` ENUM('noneSelected', 'petite', 'athletic', 'average', 'curvy', 'aFewExtraPounds', 'bbw') NULL,
    MODIFY `drinker` ENUM('noneSelected', 'nonDrinker', 'occasionalDrinker', 'happyDrinker') NULL,
    MODIFY `education` ENUM('noneSelected', 'highSchool', 'studying', 'university') NULL,
    MODIFY `ethnicity` ENUM('noneSelected', 'asian', 'southAsian', 'black', 'latin', 'eastIndian', 'middleEastern', 'nativeAmerican', 'aboriginalOrTSIslander', 'maori', 'pacificIslander', 'whiteCaucasian', 'european', 'caribean') NULL,
    MODIFY `hairColour` ENUM('noneSelected', 'blonde', 'brunette', 'black', 'red', 'grey', 'other') NULL,
    MODIFY `plan` ENUM('noneSelected', 'freePlan', 'monthAdvertiseWithContacts', 'premium', 'month12', 'month12Premium') NULL,
    MODIFY `pubicHair` ENUM('noneSelected', 'shaved', 'trimmed', 'natural') NULL,
    MODIFY `smoker` ENUM('noneSelected', 'nonSmoker', 'socially', 'yesSmoker') NULL,
    MODIFY `specialCategory` ENUM('noneSelected', 'dominatrixMistress', 'hotwife', 'onlineOnly', 'couple', 'massageOnly', 'pornActress', 'sugarBaby', 'lesbian', 'maleEscort', 'trans') NULL;
