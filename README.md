MergeCSV
========
*MergeCSV*: /Simple CSV Merge in JScript/

### What Is It? ###
Have you ever had the need to merge a bunch of CSV files together only to notice
that their columns don't line up? This typically happens with archived data where
the schema changes at some point to add a new columns or rearrange the column order.

This has happened to me on more than one occasion. Rather than spend hours in
Excel or something to normalize the files, I wrote this small script to do the work.

### How It Works ###
This is a single function that takes an array of CSV files, an array of column names
and the name of the expected output file. The column names can be in any order, so
you could even use this to rearrange columns in the output file. If a column is not
found in one of the input files, it is blank for the records imported from those
files. You can even name columns that don't exist in order to create placeholders
for data you plan to add later.

### Limitations ###
This is not a /real/ CSV parser, so it doesn't recognize quoted literals - particularly
quoted literals that contain a comma. For that reason, you should sanitize your data
before using this. If you need to use commas in quoted literals, you will want to look
at parsing the lines using RegEx instead of split(). I may add this in a future version.

### Future Features ###
* Support for commas in string literals
* Special field for including the source filename in output
* Special field for including source record number in output
