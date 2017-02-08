# vlq-buffer

[![npm](https://img.shields.io/npm/l/vlq-buffer.svg)](https://www.npmjs.com/package/vlq-buffer)
[![npm](https://img.shields.io/npm/v/vlq-buffer.svg)](https://www.npmjs.com/package/vlq-buffer)

A simple set of functions for converting between integer and VLQ buffer values

## Installation

```
$ npm install --save vlq-buffer
```

### Reference vlq-buffer

```js
var vlqBuffer = require('vlq-buffer');
```

## Usage

### int2VLQBuffer

This method converts an integer to a Buffer containing the VLQ representation of that integer.

```js

var myInt = 2097151;
var bufferValue = vlqBuffer.int2VLQBuffer(myInt);

// bufferValue == <Buffer ff ff 7f>
```

### vlqBuffer2Int

This method converts a Buffer containing a VLQ value to an integer.

```js

var myVLQValue = new Buffer([0x81, 0x80, 0x00]);
var intValue = vlqBuffer.vlqBuffer2Int(myVLQValue);

// intValue == 16384
```

### isVLQLastByte

This method returns true if the given integer's binary value starts with zero, indicating tne end of the VLQ value. This is useful for identifying the final byte in a VLQ value when reading binary data.

```js

var vlqStartIndex = readIndex; // start reading a vlq value and the current read index
var currentByte = bufferData.readUInt8(readIndex);
while (!vlqBuffer.isVLQLastByte(currentByte)) {
        if (++readIndex >= bufferData.length) throw 'EOF error'; // EOF, no vql end found
    currentByte = bufferData.readUInt8(readIndex);
}
var vlqValueBytes = bufferData.slice(vlqStartIndex, ++readIndex);
var intValue = vlq.vlqBuffer2Int(vlqValueBytes);
```

