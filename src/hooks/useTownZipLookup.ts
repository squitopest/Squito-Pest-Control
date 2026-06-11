"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  filterTowns,
  isTownServiced,
  zipToTown,
  ALL_LONG_ISLAND_TOWNS,
} from "@/data/longIslandTowns";

export function useTownZipLookup() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigateToPlans = useCallback(
    (town: string) => {
      setLoading(true);
      setTimeout(() => {
        router.push(`/plans?town=${encodeURIComponent(town)}`);
      }, 600);
    },
    [router]
  );

  const handleInputChange = (val: string) => {
    setQuery(val);
    setSelectedTown(null);
    setNotFound(false);
    setHighlightIdx(-1);

    if (val.trim().length < 1) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const matches = filterTowns(val, 8);
    setSuggestions(matches);
    setShowDropdown(matches.length > 0);

    if (matches.length === 0 && val.trim().length >= 3) {
      setNotFound(true);
    }
  };

  const selectTown = (town: string) => {
    const cleanTown = town.replace(/\s*\(\d{5}\)$/, "");
    setQuery(cleanTown);
    setSelectedTown(cleanTown);
    setSuggestions([]);
    setShowDropdown(false);
    setNotFound(false);
    setHighlightIdx(-1);
    navigateToPlans(cleanTown);
  };

  const handleGoClick = () => {
    if (!selectedTown) {
      if (isTownServiced(query)) {
        const resolved = zipToTown(query.trim());
        if (resolved) {
          navigateToPlans(resolved);
          return;
        }
        const match = ALL_LONG_ISLAND_TOWNS.find(
          (t) => t.toLowerCase() === query.trim().toLowerCase()
        );
        if (match) {
          navigateToPlans(match);
          return;
        }
      }
      const matches = filterTowns(query, 1);
      if (matches.length > 0) {
        const cleanTown = matches[0].replace(/\s*\(\d{5}\)$/, "");
        setSelectedTown(cleanTown);
        setQuery(cleanTown);
        navigateToPlans(cleanTown);
        return;
      }
      setNotFound(true);
      return;
    }
    navigateToPlans(selectedTown);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleGoClick();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIdx >= 0 && highlightIdx < suggestions.length) {
        selectTown(suggestions[highlightIdx]);
      } else {
        handleGoClick();
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return {
    query,
    suggestions,
    showDropdown,
    setShowDropdown,
    selectedTown,
    notFound,
    loading,
    highlightIdx,
    inputRef,
    dropdownRef,
    handleInputChange,
    handleKeyDown,
    handleGoClick,
    selectTown,
  };
}
