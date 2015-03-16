======
Jecho
======
( c ) 2012-2015 - Patrick Cardona
Version: 3.0
Mailto : pcardona34@gmail.com

Abstract : a Rewriting Exercise
fr : un exercice de réécriture

What's new?
No JQuery, only HTML5, Pure JS style and CSS.

Mobile version is still a work in progress...

Enjoy the new parameters:

==========================================
PARAMETERS
==========================================
i18n :

Abstract: now, Jecho can display the exercise in english, french (default),
spanich, catalan, italian or german.
To get the desired translation, just call execho.html with the lang parameter.

@param : lang
@value : cat|de|en|es|fr|it
Default value: fr
Syntaxis : *//Your_server/execho.html?lang=en
==========================================
Data file path :

The default data file is called data.json and it is in the same folder as
execho.html.
To override this file and getting your own, just use the urljson parameter.

@param : urljson
@value : URI of your_file.json
To create some new data file, see JDicto.
Default value : data.json
Syntaxis : *//Your_server/execho.html?urljson=your_file.json
You can use absolute or relative path for this value.
