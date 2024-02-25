class Result {
    _Ok;

    get Ok() {
        return this._Ok;
    }
    set Ok(value) {
        this._Ok = value;
    }

    _Error;
    get Error() {
        return this._Error;
    }
    set Error(value) {
        this._Error = value;
    }

    isError() {
        return !!this.Error
    }
    
    isOk() { 
        return !!this.Ok
    }

    /**
     * 
     */
    unwrap() {
        if(this.isError()) {
            throw this.Error
        }

        return this.Ok;
    }

    /**
     * @param {} 
     */
    expect(...messages) {
        if(this.isError()) {
            console.log(messages)
            throw this.Error
        }

        return this.Ok;
    } 
}