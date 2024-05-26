function at(n) {
    n = Math.trunc(n) || 0;
    if (n < 0) n += this.length;
    if (n < 0 || n >= this.length) return undefined;
    return this[n];
  }
  
  // Apply the polyfill to Array.prototype
  Array.prototype.at = at;
  