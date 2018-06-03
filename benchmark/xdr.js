const XDR_INT_SIZE = 4;

class XdrWriter {
    constructor() {
        this._values = [];
        this._totalLength = 0;
    }
    
    addInt(value) {
        this._values.push([0, value]);
        this._totalLength += XDR_INT_SIZE;
    }
    
    toBuffer() {
        const buffer = Buffer.alloc(this._totalLength);
        
        let offset = 0;
        let l = this._values.length;
        
        while (l--) {
            const value = this._values[l];
            
            switch (value[0]) {
                case 0:
                    buffer.writeUInt32BE(value[1], offset);
                    offset += XDR_INT_SIZE;
            }
        }
        
        return buffer;
    }
}

module.exports = { XdrWriter };