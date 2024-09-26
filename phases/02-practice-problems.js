function anagrams(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const charCount = {};

  for (let char of str1) {
    if (!charCount[char]) {
      charCount[char] = 1;
    } else {
      charCount[char]++;
    }
  }

  for (let char of str2) {
    if (!charCount[char]) {
      return false;
    } else {
      charCount[char]--;
    }
  }

  for (let count in charCount) {
    if (charCount[count] !== 0) {
      return false;
    }
  }

  return true;
}


function commonElements(arr1, arr2) {
  const hashTable = {};
  const common = [];

  for (let element of arr1) {
    hashTable[element] = true;
  }

  for (let element of arr2) {
    if (hashTable[element]) {
      common.push(element);
      delete hashTable[element];
    }
  }

  return common;
}


function duplicate(arr) {
  const hashTable = {};

  for (let element of arr) {
    if (hashTable[element]) {
      return element;
    } else {
      hashTable[element] = true;
    }
  }
}


function twoSum(nums, target) {
  const hashTable = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (hashTable[complement] !== undefined) {
      return true;
    }

    hashTable[nums[i]] = true;
  }
  return false;
}


function wordPattern(pattern, strings) {
  const patternMap = {};
  const stringMap = {};

  if (pattern.length !== strings.length) {
    return false;
  }

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const string = strings[i];

    if (!patternMap[char]) {
      patternMap[char] = string;
    } else if (patternMap[char] !== string) {
      return false;
    }

    if (!stringMap[string]) {
      stringMap[string] = char;
    } else if (stringMap[string] !== char) {
      return false;
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];