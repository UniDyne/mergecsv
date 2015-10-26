/**********************************************************************
 mergeCSV.js - Merge similar CSVs
***********************************************************************
Copyright (C) 2015 D. Oliver Brown <unidyne AT gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**********************************************************************/

/**

@inFiles : []<string>
	Array of strings with names / pathnames of files to be merged
@outFields : []<string>
	An array of strings with the names of the fields to include in the
	output in the order they should appear in the output file.
@outFile : string
	Name / pathname of output file.

**/

function mergeCSV(inFiles, outFields, outFile) {
	
	var Fso = new ActiveXObject("Scripting.FileSystemObject");
	
	// Create the output file
	var outstream = Fso.CreateTextFile(outFile, true);
	
	// Write header - list of expected fields
	outstream.WriteLine(fields.join(","));
	
	// Loop through all input files
	for(var i = 0; i < inFiles.length; i++) {
		
		// open the file and read the header line
		var instream = Fso.OpenTextFile(inFiles[i], 1);
		var headers = instream.ReadLine().split(",");
		
		
		// loop through headers and create mapping
		
		var mappings = [];
		
		for(var h = 0; h < outFields.length; h++) {
			// -1 is sentinel value for field not found
			var idx = -1;
			for(var x = 0; x < headers.length; x++) {
				if(headers[x] == outFields[h]) idx = x;
			}
			mappings.push(idx);
		}
		
		
		// read the rest of the file and collect field values
		while(!infile.atEndOfStream) {
			var rec = instream.ReadLine().split(",");
			
			var outrec = [];
			for(var h = 0; h < mappings.length; h++) {
				outrec.push( mappings[h] == -1 ? "" : rec[mappings[h]] );
			}
			
			outstream.WriteLine(outrec.join(","));
		}
		
		instream.Close();
	}
	
	outstream.Close();
}
