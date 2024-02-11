/* Final Project Milestone 1
Module: Menu
Filename: Menu.cpp
Version 1.0
Author	Festus Osayi
Revision History
-----------------------------------------------------------
Date: 2022/11/12
-----------------------------------------------------------
I have done all the coding by myself and only copied the code
that my professor provided to complete my project milestones.
-----------------------------------------------------------*/
#include <iostream>
#include <cstring>
#include <iomanip>
#include "Menu.h"
#include "Utils.h"

using namespace std;

namespace sdds
{
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // //logic and function implementation for (MenuItem) class..//
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // a custom destructor that sets the object to a safe empty state
    MenuItem::MenuItem()
    {
        setEmpty();
    }
    // an argument constructor that sets the contents of the C-style character string. If the provided string is invalid (null) then the object is set to an Empty state.
    MenuItem::MenuItem(const char *textContent)
    {
        if (strlen(textContent) > 50)
        {
            strcpy_Utils(this->menuContent, textContent, 50);
        }
        else
        {
            this->menuContent[0] = '\0';
        }
    }
    // setting the corresponding object to a safe empty state...
    void MenuItem::setEmpty()
    {
        menuContent[0] = '\0';
    }
    // This returns the contents of the cstring.
    MenuItem::operator const char *() const
    {
        return menuContent;
    }

    // Displays the content on the screen..

    std::ostream &MenuItem::display(std::ostream &ostr)const
    {
        if (this->menuContent[0] != '\0')
        {
            ostr << menuContent << endl;
        }

        return ostr;
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // //logic and function implementation for (Menu) class..//
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // a custom constructor...
    Menu::Menu()
    {
        menusetEmpty();
    }
    // Menu can hold a C-style character string with a maximum length of 50 as its title. Any attempt to set the content to more than 50 characters should store the truncated value instead (down to 50 characters).
    Menu::Menu(const char *cstr, int num)
    {

        if (cstr == nullptr)
        {
            menusetEmpty();
        }
        else{
            this->indent = num;
            this->menuCount = 0;
            if (strlen(cstr) > 50)
            {
                strcpy_Utils(menuTitle, cstr, 50);
                
            }
            else{
                strcpy(menuTitle, cstr);
            }
            
        }
        
    }

    // Overload the cast operator so if the Menu object is casted to a bool, it returns true if the Menu is valid and usable, otherwise it returns false if the Menu is in an invalid empty state.

    Menu::operator bool() const
    {
        return (menuTitle[0] != '\0');
    }
    // Write an isEmpty function that returns true if the Menu is in an invalid empty State or false if it is valid and usable.
    bool Menu::isEmpty() const
    {
        return (menuTitle[0] == '\0');
    }
    //  // Function to display the title of the menu
    std::ostream &Menu::display(std::ostream &ostr) const
    {
       bool success = false;
        if(isEmpty()) {
            ostr << "Invalid Menu!"<<endl;
        }
        else{
            Menu::indentation();
            ostr<<menuTitle<<endl;
            for(int i = 0; i < menuCount; i++) {
                if (MI[i].menuContent[0] == '\0')
                {
                    success = true;
                    break;
                }
            }
            if(success) {
                ostr << "No Items to display!" << endl;
            }
            else{
                for(int i = 0; i < menuCount; i++) {
                    Menu::indentation();
                    ostr << i + 1 << "- ";
                    this->MI[i].display();
                }
                Menu::indentation();
                ostr << "> ";
            }
            
        }
        return ostr;
    }
    
   
    // A Menu should be able to be assigned to a constant character C-string. This should reset the title of the Menu to the newly assigned string. If the string is invalid (null) the Menu is set to an invalid empty state.
    //
    void Menu::indentation() const
    {
        int i = 0;
        while(i < this->indent)
        {
            cout << "    ";
            i++;
        }
    }
    // Sets a Menu object to safe empty
    void Menu::menusetEmpty()
    {
        this->menuTitle[0] = '\0';
        this->menuCount = 0;
        this->indent = 0;
    }
    // A Menu should be able to be assigned to a constant character C-string. This should reset the title of the Menu to the newly assigned string. If the string is invalid (null) the Menu is set to an invalid empty state.
    Menu &Menu::operator=(const char *cstr)
    {
        bool success = true;
        success = cstr == nullptr;
        if(success) {
            this->menuTitle[0] = '\0';
        }
        else if(!success && strlen(cstr) > 50) {
            strcpy_Utils(this->menuTitle, cstr, 50);
        }
        else{
            strcpy(this->menuTitle, cstr);
        }
        return *this;

        
    }
    // an add function that returns nothing and receives a constant character C-string to build a MenuItem and add it to the MenuItems of the Menu.
    void Menu::add(const char *add_menu) {
        bool success = true;
        success = add_menu == nullptr;
        if(success){
            for (int i = 0; i < menuCount; i++) {
                this->MI[i].menuContent[0] = '\0';
            }
            this->menuTitle[0] = '\0';
        }
        else if(!success) {
            if(menuCount < MAX_NO_OF_ITEMS && bool(*this)) {
                if(strlen(add_menu) > 50) {
                    strcpy_Utils(this->MI[this->menuCount].menuContent, add_menu, 50);
                    menuCount++;
                }
                else{
                    strcpy(this->MI[this->menuCount].menuContent, add_menu);
                    this->menuCount++;
                }
            }
           
        }
    }
    // left shift operator overload (“<<”)
    // Overload the left shift operator to insert a constant character C - string into the Menu as a MenuItem.This overload should work exactly like the add function
    Menu &Menu::operator<<(const char *menuitemContent) {
        Menu::add(menuitemContent);
        return *this;
    }
    // a function called run that returns an integer. In this function displays the Menu and waits for the user’s response to select an option by entering the row number of the MenuItems.
    int Menu::run() const
    {
        int numContent = 0;
        bool success = true;
        Menu::display();
        if (this->MI[0].menuContent[0] == '\0' || isEmpty())
        {
            return 0;
        }
        else
        {
            while (success)
            {
                cin >> numContent;
                if (cin.fail())
                {
                    cin.clear();
                    cin.ignore(1000, '\n');
                    cerr << "Invalid Integer, try again: ";
                }
                else if ((numContent > this->menuCount || numContent < 1))
                {
                    cin.clear();
                    cin.ignore(4000, '\n');
                    cerr << "Invalid selection, try again: ";
                }
                else
                {
                    cin.ignore(4000, '\n');
                    success = false;
                }
            }
        }

        return numContent;
    }
    //
    void Menu::clear() {
        this->menuTitle[0] = '\0';
        int i = 0;
        while (i < this->menuCount)
        {
            this->MI[i].menuContent[0] = '\0';
            i++;
        }
        this->indent = 0;
    }
    // overload the cast operator so if the Menu object is casted to an integer, the run function is called, and its value is returned as the integer cast value.
    Menu::operator int() const
    {
        return this->run();
    }
}