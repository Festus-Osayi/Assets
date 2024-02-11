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
#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <cstring>
#include "Utils.h"

namespace sdds
{
    void strcpy_Utils(char *des, const char *src, int len)
    {
        int i;
        for (i = 0; src[i] && (len < 0 || i < len); i++)
        {
            des[i] = src[i];
        }
        des[i] = 0; // turning the char array des in to a cString by null terminating it.
    }
    //
    char *toUpper(char *str)
    {
        for (int i = 0; str[i] != '\0'; i++)
        {
            str[i] = toupper(str[i]);
        }

        return str;
    }

    bool strICmp(const char *str1, const char *str2)
    {
        bool res = false;

        int sz1 = strlen(str1);
        int sz2 = strlen(str2);
        if (sz1 == sz2)
        {
            char *temp1 = new char[sz1 + 1];
            strcpy(temp1, str1);
            toUpper(temp1);
            char *temp2 = new char[sz1 + 1];
            strcpy(temp2, str2);
            toUpper(temp2);
            if (strcmp(temp1, temp2) == 0)
            {
                res = true;
            }
            delete[] temp1;
            temp1 = nullptr;
            delete[] temp2;
            temp2 = nullptr;
        }

        return res;
    }
}
