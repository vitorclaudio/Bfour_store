import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSearchCacheIfNeeded } from "../../redux/actions/searchCacheAction";
import "../../styles/SearchModal.css";

class SearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = { q: "", results: [] };
        this._debounceTimer = null;
    }

    componentDidUpdate(prevProps, prevState) {
        // Ao abrir o modal: carrega cache (não mexe no productReducer)
        if (!prevProps.show && this.props.show) {
            this.props.fetchSearchCacheIfNeeded();
            this.setState({ q: "", results: [] });
        }

        if (prevState.q !== this.state.q || prevProps.items !== this.props.items) {
            if (this._debounceTimer) clearTimeout(this._debounceTimer);
            this._debounceTimer = setTimeout(this.applyFilter, 200);
        }
    }

    componentWillUnmount() {
        if (this._debounceTimer) clearTimeout(this._debounceTimer);
    }

    applyFilter = () => {
        const q = (this.state.q || "").trim().toLowerCase();

        if (!q || q.length < 3) {
            this.setState({ results: [] });
            return;
        }

        const filtered = (this.props.items || [])
            .filter((p) => {
                const name = String(p.productName || p.name || p.title || "").toLowerCase();
                const desc = String(p.description || "").toLowerCase();
                const dept = String(p.department || "").toLowerCase();
                const cat = String(p.category || "").toLowerCase();
                return name.includes(q) || desc.includes(q) || dept.includes(q) || cat.includes(q);
            })
            .slice(0, 8);

        this.setState({ results: filtered });
    };

    onChange = (e) => this.setState({ q: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const q = (this.state.q || "").trim();
        if (!q) return;
        if (this.props.onSearch) this.props.onSearch(q);
    };

    handleResultClick = (product) => {
        if (this.props.onSelectProduct) this.props.onSelectProduct(product);
    };

    render() {
        const { show, onClose, loading } = this.props;
        const { q, results } = this.state;

        if (!show) return null;

        const hint = q && q.length > 0 && q.length < 3;

        return (
            <div className="search-modal-overlay" onClick={onClose}>
                <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="search-modal-close" onClick={onClose} aria-label="Close">
                        ×
                    </button>

                    <h3 className="search-modal-title">Search</h3>

                    <form onSubmit={this.onSubmit} className="search-modal-form">
                        <input
                            className="search-modal-input"
                            value={q}
                            onChange={this.onChange}
                            placeholder="Type at least 3 letters..."
                            autoFocus
                        />
                        <button className="search-modal-btn" type="submit">
                            Search
                        </button>
                    </form>

                    {loading && (
                        <div className="search-modal-empty" style={{ marginTop: 10 }}>
                            Loading products...
                        </div>
                    )}

                    {hint && (
                        <div className="search-modal-empty" style={{ marginTop: 10 }}>
                            Type 3+ letters to search.
                        </div>
                    )}

                    {q && q.length >= 3 && (
                        <div className="search-modal-results">
                            {results.length === 0 && !loading ? (
                                <div className="search-modal-empty">No results found.</div>
                            ) : (
                                results.map((p, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        className="search-modal-item"
                                        onClick={() => this.handleResultClick(p)}
                                    >
                                        <div className="search-modal-item-title">
                                            {p.productName || p.name || p.title}
                                        </div>
                                        <div className="search-modal-item-sub">
                                            {(p.department || "")}{p.category ? ` • ${p.category}` : ""}
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    items: state.searchCache.items,
    loading: state.searchCache.loading
});

export default connect(mapStateToProps, { fetchSearchCacheIfNeeded })(SearchModal);
