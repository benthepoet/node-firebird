const XdrTypes = {
    XDR_INT: 0,
}

const XdrTypeSizes = {
    XDR_INT: 4
};

class XdrWriter {
    constructor() {
        this._values = [];
        this._totalLength = 0;
    }
    
    addInt(value) {
        this._values.push([XdrTypes.XDR_INT, value]);
        this._totalLength += XdrTypeSizes.XDR_INT;
    }
    
    toBuffer() {
        const buffer = Buffer.alloc(this._totalLength);
        
        let offset = 0;
        
        let i = -1;
        const j = this._values.length;
        
        while (++i < j) {
            const [type, value] = this._values[i];
            
            switch (type) {
                case XdrTypes.XDR_INT:
                    buffer.writeUInt32BE(value, offset);
                    offset += XdrTypeSizes.XDR_INT;
            }
        }
        
        return buffer;
    }
}

module.exports = { XdrWriter };