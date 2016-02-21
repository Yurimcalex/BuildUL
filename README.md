-------------------------------------------------------------

Lounch: node index.js

It version(branch)  builds UL on the server side. 

There another rendering context (node.js not browser) and no DOM, thats why used another algoritm for UL building.

-------------------------------------------------------------

Its for constructing unordered list from user data.

User inputs data to form in taxtarea section, for example:

data = 'Fruits\n Apples\n Berries\n  Cranberry\n  Strawberry\nVegitable\n Potato';

	Fruits
    -Apples             
    -Berries        
    --Cranberry             
    --Strawberry        
    Vegitables       
    -Potato
	
'-' - its one 'space';
	
And program construct next list:

	<ul>
		<li>Fruits
			<ul>
				<li>Apples</li>
				<li>Berries
					<ul>
						<li>Cranberry</li>
						<li>Strawberry</li>
					</ul>
				</li>
			</ul>
		</li>
		<li>Vegitables
			<ul>
				<li>Potato</li>
			</ul>
		</li>
	</ul>
	
