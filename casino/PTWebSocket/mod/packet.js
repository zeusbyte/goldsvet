function PacketBuffer(buffer, capacity) {

    const _self = this;

    _self.capacity = buffer ? buffer.byteLength : capacity || 64;
    _self.size = buffer ? buffer.byteLength : 0;
    _self.offset = 0;

    _self.buffer = buffer || new ArrayBuffer(_self.capacity);
    _self.view = new DataView(_self.buffer);

    _self._writeValue = function (value, type, size) {
        if (_self.size + size > _self.capacity) {
            let capacity = _self.capacity * 2;
            let tmp = new ArrayBuffer(capacity);
            (new Uint8Array(tmp, 0, capacity)).set(new Uint8Array(_self.buffer, 0, _self.capacity));
            _self.capacity = capacity;
            _self.buffer = tmp;
            _self.view = new DataView(_self.buffer);
        }
        _self.view['set' + type](_self.offset, value, true);
        _self.offset += size;
        _self.size += size;
    }

    _self._readValue = function (type, size, offset) {
        if (typeof offset !== "undefined") {
            _self.offset = offset;
        }
        let value = _self.view['get' + type](_self.offset, true);
        _self.offset += size;
        return value;
    }

    _self.getBuffer = function (begin, end) {
        begin = begin || 0;
        end = end || _self.size;
        return _self.buffer.slice(begin, end);
    }

    _self.dump = function (base) {
        base = base || 10;
        let result = "size: " + _self.size + ", data: ";
        let arr = new Uint8Array(_self.getBuffer());
        let hex = Array.prototype.map.call(arr, x => ('00' + x.toString(base)).slice(-2)).join(', ');
        result += hex;
        return result;
    }
}

// OutcomingPacket represents the outcoming network packet (request).
function OutcomingPacket(capacity) {
    PacketBuffer.call(this, null, capacity);

    const _self = this;

    _self.writeInt16 = function (value) {
        _self._writeValue(value, 'Int16', 2);
    }

    _self.writeUint16 = function (value) {
        _self._writeValue(value, 'Uint16', 2);
    }

    _self.writeInt32 = function (value) {
        _self._writeValue(value, 'Int32', 4);
    }

    _self.writeUint32 = function (value) {
        _self._writeValue(value, 'Uint32', 4);
    }

    _self.writeInt64 = function (value) {
        _self.writeInt32(value);
        _self.writeInt32(0);
    }

    _self.writeUint64 = function (value) {
        _self.writeUint32(value);
        _self.writeUint32(0);
    }

    _self.writeInt8 = function (value) {
        _self._writeValue(value, 'Int8', 1);
    }

    _self.writeUint8 = function (value) {
        _self._writeValue(value, 'Uint8', 1);
    }

    _self.writeString = function (value) {
        _self.writeInt16(value.length);
        for (let i = 0; i < value.length; ++i) {
            _self.writeInt8(value.charCodeAt(i));
        }
    }

    _self.writeBuffer = function (buffer) {
        buffer = new IncomingPacket(buffer);
        for (let i = 0; i < buffer.size; ++i) {
            _self.writeUint8(buffer.readUint8());
        }
    }

    // align fills the packet with zeroes to make it's size divisible to the given value.
    _self.align = function (size) {
        while (_self.size % size) {
            _self.writeInt8(0);
        }

        return _self;
    }
}

// IncomingPacket represents the incoming network packet (response).
function IncomingPacket(buffer) {
    PacketBuffer.call(this, buffer);

    const _self = this;

    _self.readInt16 = function (offset) {
        return _self._readValue('Int16', 2, offset);
    }

    _self.readUint16 = function (offset) {
        return _self._readValue('Uint16', 2, offset);
    }

    _self.readInt32 = function (offset) {
        return _self._readValue('Int32', 4, offset);
    }

    _self.readUint32 = function (offset) {
        return _self._readValue('Uint32', 4, offset);
    }

    _self.readFloat32 = function (offset) {
        return _self._readValue('Float32', 4, offset);
    }

    _self.readInt64 = function (offset) {
        let value = _self.readInt32(offset);
        _self.readInt32();
        return value;
    }

    _self.readUint64 = function (offset) {
        let value = _self.readUint32(offset);
        _self.readUint32();
        return value;
    }

    _self.readFloat64 = function (offset) {
        return _self._readValue('Float64', 8, offset);
    }

    _self.readInt8 = function (offset) {
        return _self._readValue('Int8', 1, offset);
    }

    _self.readUint8 = function (offset) {
        return _self._readValue('Uint8', 1, offset);
    }

    _self.readString = function (offset) {
        let length = _self.readInt16(offset);
        let encoded = [];
        for (let i = 0; i < length; ++i) {
            encoded.push(_self.readInt8());
        }

        let result = null;
        try {
            result = decodeURIComponent(escape(String.fromCharCode.apply(null, encoded)));
        } catch (e) {
            return "";
        }
        return result;
    }

    // For backward compatibility.
    _self.getInt16 = _self.readInt16;
    _self.getUint16 = _self.readUint16;
    _self.getInt32 = _self.readInt32;
    _self.getUint32 = _self.readUint32;
    _self.getInt64 = _self.readInt64;
    _self.getUint64 = _self.readUint64;
    _self.getFloat64 = _self.readFloat64;
    _self.getInt8 = _self.readInt8;
    _self.getUint8 = _self.readUint8;
    _self.getString = _self.readString;
}

// BytePacket is written for backward compatibility.
function BytePacket() {
    OutcomingPacket.call(this);
}

Object.defineProperty(BytePacket.prototype, "length", {
    get: function() {
        return this.size;
    }
});

module.exports = { IncomingPacket, OutcomingPacket, BytePacket }
