function SearchModal({ closeSearch }) {
  return (
    <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px'}}>
        <input type="text" placeholder="Поиск..." style={{marginBottom: '10px'}}/>
        <div>
          <button onClick={closeSearch}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
