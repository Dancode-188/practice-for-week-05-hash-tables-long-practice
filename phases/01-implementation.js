class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    if (this.count >= this.capacity * 0.7) {
      this.resize();
    }

    const index = this.hashMod(key);
    const newPair = new KeyValuePair(key, value);

    if (!this.data[index]) {
      this.data[index] = newPair;
    } else {
      let current = this.data[index];
      while (current.next) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        current = current.next;
      }
      if (current.key === key) {
        current.value = value;
      } else {
        newPair.next = this.data[index];
        this.data[index] = newPair;
      }
    }

    this.count++;
  }

  read(key) {
    const index = this.hashMod(key);
    let current = this.data[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return undefined;
  }

  resize() {
    this.capacity *= 2;
    const oldData = this.data;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;

    for (let i = 0; i < oldData.length; i++) {
      let current = oldData[i];
      while (current) {
        const index = this.hashMod(current.key);
        const newNode = new KeyValuePair(current.key, current.value);
        newNode.next = this.data[index];
        this.data[index] = newNode;
        this.count++;
        current = current.next;
      }
    }
  }

  delete(key) {
    const index = this.hashMod(key);
    let current = this.data[index];
    let prev = null;

    while (current) {
      if (current.key === key) {
        if (prev) {
          prev.next = current.next;
        } else {
          this.data[index] = current.next;
        }
        this.count--;
        return;
      }
      prev = current;
      current = current.next;
    }
    return "Key not found";
  }
}


module.exports = HashTable;