import com.tu_usuario.hostsmodifier.HostsModifierPlugin; // Importa tu plugin

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // ... código existente ...

        // Registra tu plugin
        registerPlugin(HostsModifierPlugin.class);
    }
}