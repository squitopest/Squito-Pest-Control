# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `div.Layout_container__BVtmP.page_root__EA6JT` | column | — | — | — | 3 |
| `main.Layout_content__PrPCk` | column | — | — | — | 2 |
| `nav.Header_menuRoot__tJRFd` | row | — | center | — | 1 |
| `section.CTA_homepagePrefooter__FWdih` | column | center | center | 40px | 2 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | 8px | 2 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | 8px | 2 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | 8px | 2 |
| `header.Plan_initiativesBoxHeader__BpkZm` | row | — | center | — | 1 |
| `header.SlackIssue_header__NtjDx.utils_bottomGradientBorder__` | row | space-between | center | — | 2 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | — | 5 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | — | 5 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | — | 5 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | — | 5 |
| `div.CustomerQuotes_authorInfoDesktop__0fP9Y.Flex_root__DOQCW` | column | — | — | — | 2 |
| `header.Build_header__OAL8V` | row | space-between | center | — | 2 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `div.page_panel__h_tIJ.Monitor_grid__a9Cqx` | `680px 680px` | 16px | 3 |

## Structural Containers

### `<main>` (`main.Layout_content__PrPCk`)

```
display:          flex
flex-direction:   column
justify-content:  —
align-items:      —
padding:          72px 0px 0px
children:         2
```

### `<footer>` (`footer.Footer_footer__lJt10`)

```
display:          block
max-width:        100%
children:         1
```

### `<header>` (`header.Header_header__hfMjL`)

```
display:          block
children:         1
```

### `<nav>` (`nav.Header_menuRoot__tJRFd`)

```
display:          flex
flex-direction:   row
justify-content:  —
align-items:      center
children:         1
```

### `<section>` (`section.PageSection_root__kFVv1.PageSection_rootHomepage__2x`)

```
display:          block
padding:          96px 0px 128px
children:         3
```

### `<section>` (`section.PageSection_root__kFVv1.PageSection_rootHomepage__2x`)

```
display:          block
padding:          96px 0px 128px
children:         3
```

### `<section>` (`section.PageSection_root__kFVv1.PageSection_rootHomepage__2x`)

```
display:          block
padding:          96px 0px 128px
children:         3
```

### `<section>` (`section.PageSection_root__kFVv1.PageSection_rootHomepage__2x`)

```
display:          block
padding:          96px 0px 128px
children:         2
```

### `<section>` (`section.PageSection_root__kFVv1.PageSection_rootHomepage__2x`)

```
display:          block
padding:          96px 0px 128px
children:         3
```

### `<section>` (`section#customers.CustomerQuotes_container__Grlfj.hide-lapto`)

```
display:          block
children:         3
```

### `<section>` (`section.CTA_homepagePrefooter__FWdih`)

```
display:          flex
flex-direction:   column
justify-content:  center
align-items:      center
gap:              40px
children:         2
```

### `<header>` (`header.Plan_initiativesBoxHeader__BpkZm`)

```
display:          flex
flex-direction:   row
justify-content:  —
align-items:      center
padding:          0px 24px
children:         1
```

## Layout Rules

- **Container max-width:** `100%` — always center with `margin: auto`
- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

