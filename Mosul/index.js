(function () {
    const api = window.SubwayBuilderAPI;
    const LOG = '[Mosul Mod]';
    if (!api) { console.error(LOG, 'SubwayBuilderAPI not found!'); return; }

    const t = api.utils.i18n.create({
        en: {
            description: 'Build the metro Iraq\'s second city deserves, spanning both banks of the Tigris.',
            notification: 'Welcome to Mosul!\n\nIf the map is blank, make sure run_mac-linux.sh (or run_windows.bat) is running from the mod folder. Keep the terminal window open, then restart the game.\n\nPress Ctrl + Shift + R (Cmd + Option + R on Mac) from the main menu to load mods.\n\nEnjoy!'
        },
        fr: {
            description: 'Construisez le metro que merite la deuxieme ville d\'Irak, sur les deux rives du Tigre.',
            notification: 'Bienvenue a Mossoul !\n\nSi la carte est vide, verifiez que run_mac-linux.sh (ou run_windows.bat) tourne depuis le dossier du mod. Gardez le terminal ouvert, puis redemarrez le jeu.\n\nUtilisez Ctrl + Shift + R (Cmd + Option + R sur Mac) depuis le menu principal.\n\nBon jeu !'
        }
    });

    api.registerCity({
        name: 'Mosul',
        code: 'MOS',
        description: t('description'),
        population: 393800,
        initialViewState: { zoom: 11, latitude: 36.3416, longitude: 43.1291, bearing: 0 }
    });

    api.cities.registerTab({ id: 'iraq-bgd', label: 'Iraq', cityCodes: ['MOS'] });

    api.map.setTileURLOverride({
        cityCode: 'MOS',
        tilesUrl: 'http://127.0.0.1:8080/MOS/{z}/{x}/{y}.mvt',
        foundationTilesUrl: 'http://127.0.0.1:8080/MOS_foundations/{z}/{x}/{y}.mvt',
        maxZoom: 15
    });

    api.cities.setCityDataFiles('MOS', {
        buildingsIndex: '/data/MOS/buildings_index.bin.gz',
        demandData: '/data/MOS/demand_data.json.gz',
        roads: '/data/MOS/roads.geojson.gz',
        runwaysTaxiways: '/data/MOS/runways_taxiways.geojson.gz',
        oceanDepthIndex: '/data/MOS/ocean_depth_index.json.gz',
        oceanDepthContours: '/data/MOS/ocean_depth_index_contours.json.gz'
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
        if (cityCode === 'MOS') api.ui.showNotification(t('notification'), 'info');
    });

    console.log(LOG, 'Mosul mod loaded successfully!');
})();
