-------------------------------------------------------------

Needs make recursion function for getting rezult.

It branch  builds UL on the server side. 

There another rendering context (node.js not browser) and no DOM, thats why used another algoritm for UL building.

-------------------------------------------------------------

Its for constructing unordered list from user data.

User inputs data to form in taxtarea section, for example:

data = 'Fruits\n Apples\n Berries\n  Kliukva\n  Zemlianika\nVegitable\n Kartoshka';

	Fruits
    -Apples             
    -Berries        
    --Kliukva             
    --Zemlianika        
    Vegitable       
    -Kartoshka
	
And program construct next list:

	<ul data-depth="-1">
		<li>Fruits
			<ul data-depth="0">
				<li>Apples</li>
				<li>Berries
					<ul data-depth="1">
						<li>Kliukva</li>
						<li>Zemlianika</li>
					</ul>
				</li>
			</ul>
		</li>
		<li>Vegitable
			<ul data-depth="0">
				<li>Kartoshka</li>
			</ul>
		</li>
	</ul>
	
For datail information how it work see other/howItWorks.txt
