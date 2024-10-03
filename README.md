# Unordered list maker

It creates a list based on the user's input.

For example: 

Input:
```
Fruits
    Apples             
    Berries        
        Cranberry             
        Strawberry        
Vegetables       
    Potato
```

Output:
```
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
    <li>Vegetable
        <ul data-depth="0">
            <li>Potato</li>
	</ul>
    </li>
</ul>
```