// Name: Festus Osayi
// Seneca Student ID: 170276216
// Seneca email: fosayi@myseneca.ca 
// Date of completion: 3-18-2023
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#include <iostream>
#include <iomanip>
#include "Utilities.h"

using namespace std;
namespace sdds{
     char Utilities::m_delimiter = '/';
    // sets the field width of the current object to the value of parameter `newWidth`
    void Utilities::setFieldWidth(size_t newWidth){this->m_widthField = newWidth;}

    // returns the field width of the current object
    size_t Utilities::getFieldWidth() const{return this->m_widthField;}

    //extracts a token from string `str` referred to by the first parameter.
    std::string Utilities::extractToken(const std::string& str, size_t& next_pos, bool& more){
        string extract{};
        size_t end_pos{str.find(m_delimiter, next_pos)};
        if(end_pos != string::npos){
            extract = str.substr(next_pos, end_pos - next_pos);
            next_pos = end_pos + 1;
            more = true;
        }
        else{
            extract = str.substr(next_pos);
            more = false;
        }

        extract = trim(extract);
         //updating the respective field width..
        (extract.length() > m_widthField) ? m_widthField = extract.length() : m_widthField;

        // throw error if no token was extracted
        if (extract.empty()) {
            more = false;
            throw "ERROR: Token is empty!";
        }
        return extract;
    }

    // sets the delimiter for this class to the character received
    void Utilities::setDelimiter(char newDelimiter){m_delimiter = newDelimiter;}

    // returns the delimiter for this class..

    char Utilities::getDelimiter(){return m_delimiter;}

    //this helps in removing a trailing whitespace..
     std::string Utilities::trim(const std::string& trailingspace){
         std::string value {};
        size_t first_pos{trailingspace.find_first_not_of(' ')};
        size_t last_pos{trailingspace.find_last_not_of(' ')};

        if(first_pos == std::string::npos){
            value = trailingspace;
        }else{
            value = trailingspace.substr(first_pos, (last_pos - first_pos + 1));
        }
       return value;
    }
}