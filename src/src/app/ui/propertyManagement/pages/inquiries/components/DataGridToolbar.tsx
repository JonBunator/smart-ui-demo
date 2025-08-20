"use client"
import React from "react";
import {TextField, Typography} from "@mui/material";
import {
    ColumnsPanelTrigger,
    FilterPanelTrigger,
    QuickFilter,
    QuickFilterClear,
    QuickFilterControl,
    QuickFilterTrigger,
    Toolbar,
    ToolbarButton, ToolbarButtonProps,
    ToolbarPropsOverrides,
} from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import "./DataGridToolbar.scss"

declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        /**
         * Title of the page
         */
        title: string;
        /**
         * Button element.
         */
        buttonContent: React.ReactNode;
    }
}

export default function DataGridToolbar(props: ToolbarPropsOverrides) {
    const {title, buttonContent} = props;

    return (
        <Toolbar className="datagrid-toolbar">
            <Typography variant="h6" className="title">
                {title}
            </Typography>

            <Tooltip title="Spalten">
                <ColumnsPanelTrigger render={<ToolbarButton/>}>
                    <ViewColumnIcon fontSize="small"/>
                </ColumnsPanelTrigger>
            </Tooltip>

            <Tooltip title="Filter">
                <FilterPanelTrigger
                    render={(props: ToolbarButtonProps, state) => (
                        <ToolbarButton {...props} color="default">
                            <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                                <FilterListIcon fontSize="small"/>
                            </Badge>
                        </ToolbarButton>
                    )}
                />
            </Tooltip>

            <QuickFilter className="quick-filter">
                <QuickFilterTrigger
                    render={(triggerProps: ToolbarButtonProps, state) => (
                        <Tooltip title="Suchen" enterDelay={0}>
                            <ToolbarButton
                                {...triggerProps}
                                className={`toolbar-button ${state.expanded ? "expanded" : ""}`}
                                color="default"
                                aria-disabled={state.expanded}
                            >
                                <SearchIcon fontSize="small"/>
                            </ToolbarButton>
                        </Tooltip>
                    )}
                />
                <QuickFilterControl
                    render={({ref, ...controlProps}, state) => (
                        <TextField
                            {...controlProps}
                            className={`textfield ${state.expanded ? "expanded" : ""}`}
                            inputRef={ref}
                            aria-label="Suchen"
                            placeholder="Suchen..."
                            size="small"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small"/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: state.value ? (
                                        <InputAdornment position="end">
                                            <QuickFilterClear
                                                edge="end"
                                                size="small"
                                                aria-label="Suche löschen"
                                                material={{sx: {marginRight: -0.75}}}
                                            >
                                                <CancelIcon fontSize="small"/>
                                            </QuickFilterClear>
                                        </InputAdornment>
                                    ) : null,
                                    ...controlProps.slotProps?.input,
                                },
                                ...controlProps.slotProps,
                            }}
                        />
                    )}
                />
            </QuickFilter>
            <Divider orientation="vertical" variant="middle" flexItem sx={{mx: 0.5}}/>
            <div className="button-content">
                {buttonContent}
            </div>
        </Toolbar>
    );
}