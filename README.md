-----------------------------------------------------------------

Its versin(branch) works(buikds UL) on client side.

Version on branch serverSide works on server side.

-----------------------------------------------------------------

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
	
And program construct next list:

	<ul data-depth="-1">
		<li>Fruits
			<ul data-depth="0">
				<li>Apples</li>
				<li>Berries
					<ul data-depth="1">
						<li>Cranberry</li>
						<li>Strawberry</li>
					</ul>
				</li>
			</ul>
		</li>
		<li>Vegitable
			<ul data-depth="0">
				<li>Potato</li>
			</ul>
		</li>
	</ul>
	
For datail information how it work see other/howItWorks.txt
