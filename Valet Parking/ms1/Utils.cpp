/***********************************************************************
// Utils Module
// File  utils.cpp
// Version 0.0
// Date
// Author
// Description
// Estra Classes and functions needed in the project
// Revision History
// -----------------------------------------------------------
// Name    Festus Osayi        Date    11/12/2022        Reason to strcpy
//
/////////////////////////////////////////////////////////////////
***********************************************************************/
#include "Utils.h"

namespace sdds {
    void strcpy_Utils(char *des, const char *src, int len)
    {
        int i;
        for (i = 0; src[i] && (len < 0 || i < len); i++)
        {
            des[i] = src[i];
        }
        des[i] = 0; // turning the char array des in to a cString by null terminating it.
    }
}