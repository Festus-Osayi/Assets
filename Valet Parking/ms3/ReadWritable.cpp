#include <iostream>
#include "ReadWritable.h"
#include "Vehicle.h"


using namespace std;
namespace sdds{

    // ReadWritable Has only a no-argument constructor that sets the Comma Separated Values flag to false.
    ReadWritable::ReadWritable() {
        this->value = false;
    }
    // an empty virtual destructor for ReadWritable Class.
    ReadWritable::~ReadWritable(){};
    // This query returns the Comma Separated Values flag;
    bool ReadWritable::isCsv() const{
        return this->value;
    }
    // This function set the Comma Separated Values flag to the incoming bool value.
    void ReadWritable::setCsv(bool value){
    
            this->value = value;
        
    }
    // Implement the operator<< and operator>> to make any ReadWritable class Writable or Readable using ostream and istream.
    std::ostream &operator<<(std::ostream &ostr, const ReadWritable &writable) {
        if(ostr) {
            writable.write(ostr);
        }
        return ostr;
    }
    //Implement the operator<< and operator>> to make any ReadWritable class Writable or Readable using ostream and istream.
    std::istream &operator>>(std::istream &istr, ReadWritable &readable) {
        return(readable.read(istr));
    }
}