import ExpoModulesCore
import UIKit

public class OfferwallSdkModule: Module {
  var appKey: String? = nil
  var hashKey: String? = nil

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('OfferwallSdk')` in JavaScript.
    Name("OfferwallSdk")

    // Defines event names that the module can send to JavaScript.
    Events("onOfferwallInitialized", "onOfferwallClosed", "onCampaignCompleted")

    AsyncFunction("openOfferwall") {
      DispatchQueue.main.async {
        if let rootVC = UIApplication.shared.keyWindow?.rootViewController {
          let dialog = UIViewController()
          dialog.view.backgroundColor = UIColor(white: 0, alpha: 0.7)
          let label = UILabel()
          label.text = "Offerwall Demo"
          label.textColor = .black
          label.font = UIFont.boldSystemFont(ofSize: 32)
          label.backgroundColor = .white
          label.textAlignment = .center
          label.layer.cornerRadius = 16
          label.layer.masksToBounds = true
          label.translatesAutoresizingMaskIntoConstraints = false
          dialog.view.addSubview(label)
          NSLayoutConstraint.activate([
            label.centerXAnchor.constraint(equalTo: dialog.view.centerXAnchor),
            label.centerYAnchor.constraint(equalTo: dialog.view.centerYAnchor),
            label.widthAnchor.constraint(greaterThanOrEqualToConstant: 200),
            label.heightAnchor.constraint(equalToConstant: 80)
          ])
          dialog.modalPresentationStyle = .overFullScreen
          rootVC.present(dialog, animated: false) {
            DispatchQueue.main.asyncAfter(deadline: .now() + 3.0) {
              dialog.dismiss(animated: false) {
                let campaignPayload: [String: Any] = [
                  "campaignId": "\(appKey ?? "")_\(hashKey ?? "")",
                  "reward": 100
                ]
                self.sendEvent("onCampaignCompleted", campaignPayload)
                self.sendEvent("onOfferwallClosed")
              }
            }
          }
        }
      }
    }

    Function("setAppKey") { (appKeyArg: String, hashKeyArg: String) in
      self.appKey = appKeyArg
      self.hashKey = hashKeyArg
      self.sendEvent("onOfferwallInitialized", [:])
    }
  }
}
