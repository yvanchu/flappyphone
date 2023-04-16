function LFSR(currentState) {
        let b1 = (currentState >> 4) & 0x1;
        let b2 = (currentState >> 7) & 0x1;
        let b3 = (currentState >> 11) & 0x1;
        let b4 = (currentState >> 13) & 0x1;

        let new_bit = b1 ^ b2 ^ b3 ^ b4;
        let cs = (currentState >> 1) & 0x7fff;
        return cs | (new_bit << 15);
}

export default LFSR;
