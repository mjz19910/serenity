class LineReader{
  constructor(ioDevice){/*[types](IODevice)*/
    this.set_IODevice(ioDevice);
    // what is a good buffer size?
    this.buffer_size=0;
    this.buffer=new Uint8Array(0);//equiv of nullptr
    //16384
    this.set_buffer_size("1MB");
    this.buffer_index=0;
    //indexes into the buffer of 
    //'\n' char's so you don't have to search for the '\n'
    //every time
    this.line_cache=[];
  }
  set_IODevice(file){/*[types](IODevice)*/
    this._IODevice=file;
  }
  get_IODevice(){
    return this._IODevice;
  }//->File
  has_line(){
    return this.buffer.indexOf('\n',this.buffer_index)>-1;
  }//->bool [cached_search]
  set_buffer_size(size){
    if(this.buffer_size>size){
      this.buffer_size=size;
      this.buffer=alloc(size);
    }else{
      this.buffer_size=size;
      this.buffer=alloc_resize(this.buffer,size);
    }
  }/*//->Success
  bool [might_allocate] [resize_downsize_if_new_size<buffer_usage+1]
  [resize_downsize_fail_if_new_size>=buffer_usage+1]
  */
  read_once(){
    if((this.buffer.length-1)==this.buf_read_loc){
      return this.has_line();
    }
    this.ioDevice.read(this.buffer.length-this.buffer_read_loc)
  }//->bool [got_line]
  next_line(){}//->bool [got_line]
  current_line(){}//->Optional<String>
  can_read_line(){}//->bool /*do we have more buffer & not at eof*/
}
