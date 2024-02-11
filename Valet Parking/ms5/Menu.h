/* Final Project Milestone 1
Module: Menu
Filename: Menu.h
Version 1.0
Author	Festus Osayi
Revision History
-----------------------------------------------------------
Date: 2022/11/19
-----------------------------------------------------------
I have done all the coding by myself and only copied the code
that my professor provided to complete my project milestones.
-----------------------------------------------------------*/
#ifndef _SDDS_MENU_H_
#define _SDDS_MENU_H_
#include <iostream>

namespace sdds
{
    // constant variables
    const int MAX_NO_OF_ITEMS = 10;
    const char MENU_CONTENT = 50;
    //!!!!!!!!!!!!!!!!!!!!
    // Class declaration
    //!!!!!!!!!!!!!!!!!!!!
    class menu;
    class MenuItem
    {
        // Holds only 50 Cstring of characters for the content of the menu item.
        char menuContent[MENU_CONTENT + 1];

        MenuItem();
        MenuItem(const char *textContent);
        operator const char *() const;

        // Copying is not allowed
        MenuItem(const MenuItem &menuItem) = delete;
        void operator=(const MenuItem &MI) = delete;

        // Sets a MenuItem object to safe empty
        void setEmpty();
        // Display the content of the MenuItem on ostream
        std::ostream &display(std::ostream &ostr = std::cout) const;

        friend class Menu;
    };

    // class menu...
    class Menu
    {

        char menuTitle[MENU_CONTENT + 1];
        int indent{};
        int menuCount;
        MenuItem MI[MAX_NO_OF_ITEMS];

    public:
        Menu();
        Menu(const char *cstr, int num = 0);
        Menu(const Menu &) = delete;
        operator int() const;
        // Return true if the Menu has one or more MenuItems otherwise, false;
        operator bool() const;
        // Write an isEmpty function that returns true if the Menu is in an invalid empty State or false if it is valid and usable.
        bool isEmpty() const;
        // Display the content of Menu on ostream
        std::ostream &display(std::ostream &ostr = std::cout) const;
        // assignment operator
        Menu &operator=(const char *cstr);
        // add function that returns nothing and receives a constant character C-string to build a MenuItem and add it to the MenuItems of the Menu.
        void add(const char *add_menu);
        // Overload a member insertion operator (operator<<) to add a MenuItem to the Menu.
        Menu &operator<<(const char *menuitemContent);
        // Displays the Menu and gets the user selection.
        int run() const;
        void clear();
        void indentation() const;
        void menusetEmpty();
    };
}

#endif // end of an if statement...
