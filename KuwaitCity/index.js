(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Kuwait City Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Kuwait City never got, from the airport to Jahra and Fahaheel.',
            notification: 'Welcome to Kuwait City!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que le Koweit n\'a jamais eu, de l\'aeroport a Jahra et Fahaheel.',
            notification: 'Bienvenue a Koweit City !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Kuwait City',
        code: 'KWI',
        description: t('description'),
        population: 1913950,
        initialViewState: { zoom: 11, latitude: 29.3697, longitude: 47.9783, bearing: 0 }
    });

    api.cities.registerTab({ id: 'kuwait-kwi', label: 'Kuwait', cityCodes: ['KWI'] });

    api.map.setTileURLOverride({
        cityCode: 'KWI',
        tilesUrl: 'http://127.0.0.1:8080/KWI/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/KWI_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('KWI', {
        buildingsIndex: '/data/KWI/buildings_index.bin.gz',
        demandData: '/data/KWI/demand_data.json.gz',
        roads: '/data/KWI/roads.geojson.gz',
        runwaysTaxiways: '/data/KWI/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/KWI/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/KWI/ocean_depth_index_contours.json.gz'
    });

    api.map.setLayerOverride({
        layerId: 'parks-large',
        sourceLayer: 'landuse',
        filter: ['in', ['get', 'kind'], ['literal',
            ['park','garden','nature_reserve','grass','cemetery','golf_course',
             'forest','wood','meadow','village_green','recreation_ground','pitch','zoo','allotments']]]
    });

    api.map.setLayerOverride({
        layerId: 'airports',
        sourceLayer: 'landuse',
        filter: ['==', ['get', 'kind'], 'aerodrome']
    });

    api.hooks.onCityLoad(function(cityCode) {
        if (cityCode === 'KWI') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Kuwait City mod loaded successfully!');
})();
