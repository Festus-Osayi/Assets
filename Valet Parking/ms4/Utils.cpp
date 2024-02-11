/* Final Project Milestone 3
Module: Vehicle
Filename: Vehicle.cpp
Version 3.0
Author	Festus Osayi
Revision History
-----------------------------------------------------------
Date: 2022/11/26
-----------------------------------------------------------
I have done all the coding by myself and only copied the code
that my professor provided to complete my project milestones.
-----------------------------------------------------------*/

#define _CRT_SECURE_NO_WARNINGS
#include <cstring>
#include <cctype>
#include "Utils.h"

namespace sdds
{
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