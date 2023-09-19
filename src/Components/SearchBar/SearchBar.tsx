import './SearchBar.css';


interface SearchBarProps {
    onSearch: (query: string) => void;
}


export default function SearchBar({onSearch}: SearchBarProps) {
   
   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearch(query);
   }


    return (
        <div className="search-bar">
            <input
            type="text"
            placeholder="Search contacts"
            onChange={handleSearchChange}
            
            />
        </div>
    )
}